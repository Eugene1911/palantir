import { cast, flow, Instance, types } from 'mobx-state-tree';
import {
  AllCustomStatus,
  INotification,
  LoadingStatus,
} from 'sharedTypes';
import { AxiosResponse } from 'axios';

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
  selected: types.boolean,
  tempSelected: types.boolean,
});

export type TCategoryModel = Instance<typeof CategoryModel>;

const BaseTagsAndCategoriesModel = types
  .model({
    radio: types.enumeration<AllCustomStatus>(
      Object.values(AllCustomStatus),
    ),
    list: types.array(ItemModel),
    categoriesList: types.array(CategoryModel),
    listStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
    errorWord: types.string,
    parentField: types.string,
  })
  .views(self => ({
    get selectedCount(): number {
      let count = 0;
      self.categoriesList.forEach(category => {
        if (category.list.length) {
          category.list.forEach(item => {
            count += +item.tempSelected;
          });
        } else {
          count += +category.tempSelected;
        }
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
          parent.selectedCount = parent.list.filter(
            item => item.tempSelected,
          ).length;
          parent.tempSelected =
            parent.selectedCount === parent.list.length;
        }
      }
    },
    selectAllCategory(id: number, value: boolean): void {
      const currentCategory = self.categoriesList.find(
        category => category.id === id,
      );
      if (currentCategory) {
        currentCategory.tempSelected = value;
        currentCategory.list.forEach(item => {
          item.tempSelected = value;
        });
        currentCategory.selectedCount = currentCategory.list.filter(
          item => item.tempSelected,
        ).length;
      }
    },
    deleteSelected(id: number, parentId: number): void {
      if (parentId || parentId === 0) {
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
            parent.selected =
              parent.selectedCount === parent.list.length;
            parent.tempSelected =
              parent.selectedCount === parent.list.length;
          }
          const itemListIndex = self.list.findIndex(
            item => item.id === id,
          );
          if (itemListIndex !== -1) {
            self.list.splice(itemListIndex, 1);
          }
        }
      } else {
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
      }
    },
    saveSelected(): void {
      self.list = cast([]);
      self.categoriesList.forEach(category => {
        category.selected = category.tempSelected;
        if (category.selected && !category.list.length) {
          self.list.push({ ...category });
        }
        category.list.forEach(item => {
          item.selected = item.tempSelected;
          if (item.selected) {
            self.list.push({
              ...item,
              name: `${category.name} ${item.name}`,
            });
          }
        });
      });
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
      getCategoriesAction: (params: object) => Promise<AxiosResponse>,
      getItemsAction: (params: object) => Promise<AxiosResponse>,
      withItems = true,
    ) {
      self.listStatus = LoadingStatus.LOADING;
      try {
        const [categoriesData, itemsData] = yield Promise.all([
          getCategoriesAction({}),
          getItemsAction({}),
        ]);
        const categoriesList = categoriesData.data;
        const itemsList = itemsData.data;

        const categories: TCategoryModel[] = categoriesList.map(
          category => ({
            id: category.id,
            name: category.name || category.value,
            list: [],
            selectedCount: 0,
            selected: false,
            tempSelected: false,
          }),
        );
        if (withItems) {
          itemsList.forEach(item => {
            const itemCategory = categories.find(
              category => category.id === item[self.parentField],
            );
            if (itemCategory) {
              itemCategory.list.push({
                id: item.id,
                name: item.name || item.value,
                parentId: item[self.parentField],
                selected: false,
                tempSelected: false,
              });
            }
          });
        }
        self.categoriesList = cast(categories);
        self.listStatus = LoadingStatus.SUCCESS;
      } catch (error) {
        self.listStatus = LoadingStatus.ERROR;

        infoNotification({
          variant: 'error',
          message: `${self.errorWord} loading error`,
        });
      }
    }),
    getCategoriesResult(): number[] {
      if (self.radio === AllCustomStatus.ALL) {
        return [];
      }
      const allSelected = self.categoriesList
        .filter(
          category => category.selected && !category.list.length,
        )
        .map(category => category.id);
      const allCategories = [...allSelected];
      self.list.forEach(item => {
        if (
          item.selected &&
          item.parentId &&
          !allCategories.includes(item.parentId)
        ) {
          allCategories.push(item.parentId);
        }
      });
      return allCategories;
    },
    getItemsResult(): number[] {
      if (self.radio === AllCustomStatus.ALL) {
        return [];
      }
      return self.list
        .filter(item => item.selected && item.parentId)
        .map(item => item.id);
    },
  }));

export default BaseTagsAndCategoriesModel;
