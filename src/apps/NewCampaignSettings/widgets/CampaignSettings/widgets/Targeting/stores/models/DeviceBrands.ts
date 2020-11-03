import { cast, flow, Instance, types } from 'mobx-state-tree';
import {
  AllCustomStatus,
  INotification,
  LoadingStatus,
} from 'sharedTypes';
import { getDevicesBrands, getDevicesModels } from 'resources/api';

const ItemModel = types.model({
  id: types.number,
  name: types.string,
  parentId: types.maybe(types.number),
  selected: types.boolean,
  tempSelected: types.boolean,
});

const CategoryModel = types.model({
  id: types.number,
  name: types.string,
  list: types.array(ItemModel),
  selectedCount: types.number,
});

export type TCategoryModel = Instance<typeof CategoryModel>;

export const InitialDeviceBrandsModel = {
  radio: AllCustomStatus.ALL,
  list: [],
  categoriesList: [],
  listStatus: LoadingStatus.INITIAL,
};

const DeviceBrandsModel = types
  .model({
    radio: types.enumeration<AllCustomStatus>(
      Object.values(AllCustomStatus),
    ),
    list: types.array(ItemModel),
    categoriesList: types.array(CategoryModel),
    listStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
  })
  .views(self => ({
    get selectedCount(): number {
      let count = 0;
      self.categoriesList.forEach(category => {
        category.list.forEach(model => {
          count += +(model.selected || model.tempSelected);
        });
      });
      return count;
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
        currentCategory.list.forEach(model => {
          if (value && !(model.selected || model.tempSelected)) {
            currentCategory.selectedCount += 1;
          } else if (
            !value &&
            (model.selected || model.tempSelected)
          ) {
            currentCategory.selectedCount -= 1;
          }
          model.tempSelected = value;
          model.selected = false;
        });
      }
    },
    deleteSelected(id: number, parentId: number): void {
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
        }
      }
    },
    saveSelected(): void {
      self.list = cast([]);
      self.categoriesList.forEach(category => {
        category.list.forEach(model => {
          if (model.tempSelected) {
            model.tempSelected = false;
            model.selected = true;
          }
          if (model.tempSelected || model.selected) {
            self.list.push({
              ...model,
              name: `${category.name} ${model.name}`,
            });
          }
        });
      });
    },
    cancelSelected(): void {
      self.categoriesList.forEach(category => {
        category.list.forEach(model => {
          if (model.tempSelected) {
            model.tempSelected = false;
            category.selectedCount -= 1;
          }
        });
      });
    },
    getList: flow(function* getList(
      infoNotification: (arg: INotification) => void,
    ) {
      self.listStatus = LoadingStatus.LOADING;
      try {
        const [brandsData, modelsData] = yield Promise.all([
          getDevicesBrands({}),
          getDevicesModels({}),
        ]);
        const brands = brandsData.data;
        const models = modelsData.data;

        const categories: TCategoryModel[] = brands.map(brand => ({
          id: brand.id,
          name: brand.name,
          list: [],
          selectedCount: 0,
        }));
        models.forEach(model => {
          const modelCategory = categories.find(
            category => category.id === model.brand_id,
          );
          if (modelCategory) {
            modelCategory.list.push({
              id: model.id,
              name: model.name,
              parentId: model.brand_id,
              selected: false,
              tempSelected: false,
            });
          }
        });
        self.categoriesList = cast(
          categories.filter(category => !!category.list.length),
        );
        self.listStatus = LoadingStatus.SUCCESS;
      } catch (error) {
        self.listStatus = LoadingStatus.ERROR;

        infoNotification({
          variant: 'error',
          message: 'Device brands and models loading error',
        });
      }
    }),
  }));

export type TDeviceBrandsModel = Instance<typeof DeviceBrandsModel>;

export default DeviceBrandsModel;
