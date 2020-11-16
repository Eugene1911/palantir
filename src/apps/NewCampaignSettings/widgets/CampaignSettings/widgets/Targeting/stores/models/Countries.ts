import { cast, flow, Instance, types } from 'mobx-state-tree';
import {
  AllCustomStatus,
  INotification,
  LoadingStatus,
} from 'sharedTypes';
import { getCountries, getRegionByCountryCode } from 'resources/api';
import { countriesWithGroups } from '../../constants/countriesGroups';

const ItemModel = types.model({
  id: types.number,
  name: types.string,
  parentId: types.maybe(types.number),
  selected: types.boolean,
  tempSelected: types.boolean,
  asLabel: types.maybe(types.boolean),
  isDefaultStyle: types.maybe(types.boolean),
});

const CategoryModel = types.model({
  id: types.number,
  name: types.string,
  code: types.string,
  list: types.array(ItemModel),
  selectedCount: types.number,
  selected: types.boolean,
  tempSelected: types.boolean,
  groups: types.array(types.string),
});

export type TCategoryModel = Instance<typeof CategoryModel>;

export const InitialCountriesModel = {
  radio: AllCustomStatus.ALL,
  list: [],
  categoriesList: [],
  listStatus: LoadingStatus.INITIAL,
  regionStatus: LoadingStatus.INITIAL,
};

const CountriesModel = types
  .model({
    radio: types.enumeration<AllCustomStatus>(
      Object.values(AllCustomStatus),
    ),
    list: types.array(ItemModel),
    categoriesList: types.array(CategoryModel),
    listStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
    regionStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
  })
  .views(self => ({
    get selectedCount(): number {
      let count = 0;
      self.categoriesList.forEach(category => {
        count += +(category.selected || category.tempSelected);
        category.list.map(item => item);
      });
      return count;
    },
    get getAllCount(): string {
      let countryCount = 0;
      let regionCount = 0;
      self.list.forEach(item => {
        if (item.parentId) {
          regionCount += 1;
        } else if (!item.asLabel) {
          countryCount += 1;
        }
      });
      let resultString = '';
      if (countryCount || regionCount) {
        if (countryCount) {
          resultString += `${countryCount} Countries`;
        }
        if (countryCount && regionCount) {
          resultString += ', ';
        }
        if (regionCount) {
          resultString += `${regionCount} Regions`;
        }
      }
      return resultString;
    },
  }))
  .actions(self => ({
    setRadio(radio: AllCustomStatus): void {
      self.radio = radio;
    },
    setSelected(id: number, value: boolean, parentId: number): void {
      const parent = self.categoriesList.find(
        category => category.id === parentId,
      );
      if (parent) {
        const itemIndex = parent.list.findIndex(
          item => item.id === id,
        );
        if (itemIndex !== -1) {
          parent.list[itemIndex].tempSelected = value;
          parent.list[itemIndex].selected = false;
          if (value) {
            parent.selectedCount += 1;
          } else {
            parent.selectedCount -= 1;
          }
        }
      }
    },
    selectAllCategory(id: number, value: boolean): void {
      const currentCategory = self.categoriesList.find(
        category => category.id === id,
      );
      if (currentCategory) {
        currentCategory.tempSelected = value;
      }
    },
    deleteSelected(id: number, parentId: number): void {
      if (!parentId) {
        const itemIndex = self.categoriesList.findIndex(
          item => item.id === id,
        );
        if (itemIndex !== -1) {
          self.categoriesList[itemIndex].selected = false;
        }
        const itemListIndex = self.list.findIndex(
          item => item.id === id,
        );
        if (itemListIndex !== -1) {
          self.list.splice(itemListIndex, 1);
        }
      } else {
        const parent = self.categoriesList.find(
          category => category.id === parentId,
        );
        if (parent) {
          const itemIndex = parent.list.findIndex(
            item => item.id === id,
          );
          if (itemIndex !== -1) {
            parent.list[itemIndex].selected = false;
            parent.selectedCount -= 1;
          }
          const itemListIndex = self.list.findIndex(
            item => item.id === id,
          );
          if (itemListIndex !== -1) {
            self.list.splice(itemListIndex, 1);
            if (!parent.selectedCount) {
              const parentListIndex = self.list.findIndex(
                item => item.id === parentId,
              );
              if (parentListIndex !== -1) {
                self.list.splice(parentListIndex, 1);
              }
            }
            // чисто лайфхак, чтобы компонент ChipsWithFilter обновлялся
            self.listStatus = LoadingStatus.ERROR;
            self.listStatus = LoadingStatus.SUCCESS;
          }
        }
      }
    },
    saveSelected(): void {
      self.list = cast([]);
      self.categoriesList.forEach(category => {
        if (category.tempSelected) {
          category.tempSelected = false;
          category.selected = true;
        }
        if (category.tempSelected || category.selected) {
          self.list.push({
            id: category.id,
            name: category.name,
            parentId: undefined,
            selected: category.selected,
            tempSelected: category.tempSelected,
          });
        } else {
          const tempList = [];
          category.list.forEach(model => {
            if (model.tempSelected) {
              model.tempSelected = false;
              model.selected = true;
            }
            if (model.tempSelected || model.selected) {
              tempList.push({ ...model, isDefaultStyle: true });
            }
          });
          if (tempList.length) {
            self.list.push({
              id: category.id,
              name: `${category.name}:`,
              parentId: undefined,
              selected: category.selected,
              tempSelected: category.tempSelected,
              asLabel: true,
            });
            self.list.push(...tempList);
          }
        }
      });
    },
    cancelSelected(): void {
      self.categoriesList.forEach(category => {
        if (category.tempSelected) {
          category.tempSelected = false;
        }
        category.list.forEach(model => {
          if (model.tempSelected) {
            model.tempSelected = false;
            category.selectedCount -= 1;
          }
        });
      });
    },
    cancelSelectedRegion(parentId: number): void {
      const parent = self.categoriesList.find(
        category => category.id === parentId,
      );
      if (parent) {
        parent.list.forEach(model => {
          if (model.tempSelected) {
            model.tempSelected = false;
            parent.selectedCount -= 1;
          }
        });
      }
    },
    getList: flow(function* getList(
      infoNotification: (arg: INotification) => void,
    ) {
      self.listStatus = LoadingStatus.LOADING;
      try {
        const { data } = yield getCountries({});

        self.categoriesList = cast(
          data.map(item => ({
            id: item.id,
            name: item.name,
            code: item.code2,
            list: [],
            selectedCount: 0,
            selected: false,
            tempSelected: false,
            groups: countriesWithGroups[item.code2] || [],
          })),
        );
        self.listStatus = LoadingStatus.SUCCESS;
      } catch (error) {
        self.listStatus = LoadingStatus.ERROR;

        infoNotification({
          variant: 'error',
          message: 'Countries loading error',
        });
      }
    }),
    getRegion: flow(function* getRegion(
      infoNotification: (arg: INotification) => void,
      code: string,
    ) {
      self.regionStatus = LoadingStatus.LOADING;
      try {
        const { data } = yield getRegionByCountryCode(code);

        const parent = self.categoriesList.find(
          category => category.code === code,
        );

        if (parent) {
          parent.list = data.map(region => ({
            id: region.id,
            name: region.name,
            parentId: parent.id,
            selected: false,
            tempSelected: false,
          }));
        }

        self.regionStatus = LoadingStatus.SUCCESS;
      } catch (error) {
        self.regionStatus = LoadingStatus.ERROR;

        infoNotification({
          variant: 'error',
          message: 'Region loading error',
        });
      }
    }),
  }));

export type TCountriesModel = Instance<typeof CountriesModel>;

export default CountriesModel;
