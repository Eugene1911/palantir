import { cast, flow, Instance, types } from 'mobx-state-tree';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
import {
  AllCustomStatus,
  INotification,
  LoadingStatus,
} from 'sharedTypes';
import { getCountries, getRegionByCountryCode } from 'resources/api';
import { countriesWithGroups } from '../../constants/countriesGroups';
import { errorsString } from '../../../../constants/strings';

const ItemModel = types.model({
  id: types.number,
  name: types.string,
  parentId: types.maybe(types.number),
  selected: types.boolean,
  tempSelected: types.boolean,
  asLabel: types.maybe(types.boolean),
  isDefaultStyle: types.maybe(types.boolean),
  code: types.maybe(types.string),
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

export const InitialCountriesModel = {
  radio: AllCustomStatus.ALL,
  list: [],
  categoriesList: [],
  listStatus: LoadingStatus.INITIAL,
  regionStatus: LoadingStatus.INITIAL,
  editSelectedCategoriesId: [],
  editSelectedItemsId: [],
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
    editSelectedCategoriesId: types.array(types.string),
    editSelectedItemsId: types.array(types.string),
  })
  .views(self => ({
    get selectedCount(): number {
      return self.categoriesList.filter(item => item.tempSelected)
        .length;
    },
    get allSelectedCount(): number {
      let sum = 0;
      self.categoriesList.forEach(category => {
        if (category.tempSelected) {
          sum += 1;
        } else {
          sum += category.selectedCount;
        }
      });
      return sum;
    },
    getAllCount(asCodes = false): string {
      let countryCount = 0;
      let regionCount = 0;
      const codes = [];
      self.list.forEach(item => {
        if (item.parentId) {
          regionCount += 1;
        } else {
          countryCount += 1;
          codes.push(item.code);
        }
      });
      let resultString = '';
      if (countryCount || regionCount) {
        if (countryCount) {
          let codesString = '';
          if (asCodes && countryCount <= 3) {
            codes.forEach((code, i) => {
              codesString += code;
              if (i !== codes.length - 1) {
                codesString += ', ';
              }
            });
          }
          resultString += codesString || `${countryCount} Countries`;
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
  .views(self => ({
    get stepperText(): string {
      const count = self.getAllCount(true);
      if (self.radio === AllCustomStatus.ALL || !count) {
        return 'All countries';
      }
      return count;
    },
  }))
  .actions(self => ({
    selectAllCategories(value: boolean): void {
      self.categoriesList.forEach(category => {
        category.tempSelected = value;
      });
    },
    selectAllItems(value: boolean, parentId: number): void {
      const parent = self.categoriesList.find(
        category => category.id === parentId,
      );
      if (parent) {
        parent.list.forEach(item => {
          item.tempSelected = value;
          parent.selectedCount = parent.list.filter(
            i => i.tempSelected,
          ).length;
          parent.tempSelected =
            parent.selectedCount === parent.list.length;
        });
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
    saveSelected(): void {
      self.list = cast([]);
      self.categoriesList.forEach(category => {
        category.selected = category.tempSelected;
        if (category.selected) {
          self.list.push({
            id: category.id,
            name: category.name,
            parentId: undefined,
            selected: category.selected,
            tempSelected: category.tempSelected,
            code: category.code,
          });
        } else {
          const tempList = [];
          category.list.forEach(item => {
            item.selected = item.tempSelected;
            if (item.selected) {
              tempList.push({ ...item, isDefaultStyle: true });
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
              code: category.code,
            });
            self.list.push(...tempList);
          }
        }
      });
    },
    setSelected(
      id: number,
      value: boolean,
      parentId: number,
      parentCode?: string,
    ): void {
      const parent = self.categoriesList.find(category =>
        parentCode
          ? category.code === parentCode
          : category.id === parentId,
      );
      if (parent) {
        const itemIndex = parent.list.findIndex(
          item => item.id === id,
        );
        if (itemIndex !== -1) {
          parent.list[itemIndex].tempSelected = value;
          parent.selectedCount = parent.list.filter(
            item => item.tempSelected,
          ).length;
          parent.tempSelected =
            parent.selectedCount === parent.list.length;
        }
      }
    },
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
        const message =
          error?.response?.data?.msg || errorsString.getRegions;

        infoNotification({
          variant: 'error',
          message,
        });
      }
    }),
  }))
  .actions(self => ({
    selectDataByEditIds: flow(function* selectDataByEditIds(
      infoNotification: (arg: INotification) => void,
    ) {
      if (self.editSelectedItemsId.length) {
        const categoryCodes: string[] = [];
        self.editSelectedItemsId.forEach(itemCode => {
          const code = itemCode.split('.')[0];
          if (code && !categoryCodes.includes(code)) {
            categoryCodes.push(code);
          }
        });
        const actions = categoryCodes.map(code =>
          self.getRegion(infoNotification, code),
        );
        yield Promise.all(actions);
        self.editSelectedItemsId.forEach(itemCode => {
          const itemData = itemCode.split('.');
          const parentCode = itemData[0];
          const itemId = +itemData[1];
          self.setSelected(itemId, true, -1, parentCode);
        });
      }
      if (self.editSelectedCategoriesId.length) {
        self.editSelectedCategoriesId.forEach(categoryCode => {
          const categoryId = self.categoriesList.find(
            category => category.code === categoryCode,
          )?.id;
          if (categoryId) {
            self.selectAllCategory(categoryId, true);
          }
        });
      }
      self.saveSelected();
    }),
  }))
  .actions(self => ({
    setRadio(radio: AllCustomStatus): void {
      self.radio = radio;
    },
    deleteSelected(id: number, parentId: number): void {
      if (!parentId && parentId !== 0) {
        const itemIndex = self.categoriesList.findIndex(
          item => item.id === id,
        );
        if (itemIndex !== -1) {
          self.categoriesList[itemIndex].selected = false;
          self.categoriesList[itemIndex].tempSelected = false;
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
            parent.list[itemIndex].tempSelected = false;
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
            // лайфхак, чтобы компонент ChipsWithFilter обновлялся
            self.listStatus = LoadingStatus.ERROR;
            self.listStatus = LoadingStatus.SUCCESS;
          }
        }
      }
    },
    cancelSelected(): void {
      self.categoriesList.forEach(category => {
        category.tempSelected = category.selected;
        category.list.forEach(item => {
          item.tempSelected = item.selected;
        });
        category.selectedCount = category.list.filter(
          item => item.selected,
        ).length;
      });
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
        self.selectDataByEditIds(infoNotification);
        self.listStatus = LoadingStatus.SUCCESS;
      } catch (error) {
        self.listStatus = LoadingStatus.ERROR;
        const message =
          error?.response?.data?.msg || errorsString.getCountries;

        infoNotification({
          variant: 'error',
          message,
        });
      }
    }),
    getAccordionText(): string {
      const count = self.getAllCount(true);
      if (self.radio === AllCustomStatus.ALL || !count) {
        return 'All countries';
      }
      return count;
    },
    getCategoriesResult(): string[] {
      if (self.radio === AllCustomStatus.ALL) {
        return [];
      }
      return self.list
        .filter(
          category =>
            category.selected &&
            !category.parentId &&
            !category.asLabel,
        )
        .map(category => category.code);
    },
    getItemsResult(): string[] {
      if (self.radio === AllCustomStatus.ALL) {
        return [];
      }
      const items = [];
      let activeCategory = '';
      self.list.forEach(item => {
        if (item.asLabel) {
          activeCategory = item.code;
        } else if (item.parentId) {
          items.push(`${activeCategory}.${item.id}`);
        }
      });
      return items;
    },
  }))
  .actions(self => ({
    setEditData(data: IFullCampaignType): void {
      if (data.countries?.length || data.geo_targets?.length) {
        self.setRadio(AllCustomStatus.CUSTOM);
        self.editSelectedCategoriesId = cast(data.countries);
        self.editSelectedItemsId = cast(data.geo_targets);
      }
    },
  }));

export type TCountriesModel = Instance<typeof CountriesModel>;

export default CountriesModel;
