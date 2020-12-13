import { cast, flow, Instance, types } from 'mobx-state-tree';
import {
  AllCustomStatus,
  INotification,
  LoadingStatus,
} from 'sharedTypes';
import { AxiosResponse } from 'axios';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
import { categoriesForceAdd } from '../../constants/categoriesForceAdd';
import { IFilterCategoryItem } from '../../../../components/CustomDrawer/components/ListCategory';

const ItemModel = types.model({
  id: types.number,
  name: types.string,
  parentId: types.maybe(types.number),
  selected: types.boolean,
  tempSelected: types.boolean,
});

const BaseItemModel = types.model({
  id: types.number,
  parentId: types.maybe(types.number),
});

type TBaseItemModel = Instance<typeof BaseItemModel>;

const CategoryModel = types.model({
  id: types.number,
  name: types.string,
  list: types.array(ItemModel),
  selectedCount: types.number,
  selected: types.boolean,
  tempSelected: types.boolean,
  code: types.maybe(types.string),
});

export type TCategoryModel = Instance<typeof CategoryModel>;

export const InitialBaseTagsAndCategoriesModel = {
  radio: AllCustomStatus.ALL,
  list: [],
  categoriesList: [],
  fullItemsList: [],
  listStatus: LoadingStatus.INITIAL,
  editSelectedCategoriesId: [],
  editSelectedItemsId: [],
};

const BaseTagsAndCategoriesModel = types
  .model({
    radio: types.enumeration<AllCustomStatus>(
      Object.values(AllCustomStatus),
    ),
    list: types.array(ItemModel),
    categoriesList: types.array(CategoryModel),
    fullItemsList: types.array(BaseItemModel),
    listStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
    errorWord: types.string,
    parentField: types.string,
    editSelectedCategoriesId: types.array(types.number),
    editSelectedItemsId: types.array(types.number),
    editSelectedCategoryField: types.string,
    editSelectedItemField: types.string,
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
    selectAllItems(
      value: boolean,
      filterCategoriesFunction?: (
        category: IFilterCategoryItem,
      ) => boolean,
    ): void {
      self.categoriesList.forEach(category => {
        if (
          !filterCategoriesFunction ||
          (!!filterCategoriesFunction &&
            filterCategoriesFunction(category))
        ) {
          category.tempSelected = value;
          category.list.forEach(item => {
            item.tempSelected = value;
          });
          category.selectedCount = category.list.filter(
            item => item.tempSelected,
          ).length;
        }
      });
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
            const name = category.code
              ? item.name
              : `${category.name} ${item.name}`;
            self.list.push({
              ...item,
              name,
            });
          }
        });
      });
    },
  }))
  .actions(self => ({
    selectDataByEditIds(): void {
      if (self.editSelectedItemsId.length) {
        self.editSelectedItemsId.forEach(itemId => {
          const parentId = self.fullItemsList.find(
            item => item.id === itemId,
          )?.parentId;
          if (parentId) {
            self.setSelected(itemId, true, parentId);
          } else {
            self.editSelectedCategoriesId.unshift(itemId);
          }
        });
      }
      if (self.editSelectedCategoriesId.length) {
        self.editSelectedCategoriesId.forEach(categoryId => {
          const category = self.categoriesList.find(
            ctgr => ctgr.id === categoryId,
          );
          if (category && !category.list.length) {
            self.selectAllCategory(categoryId, true);
          }
        });
      }
      self.saveSelected();
    },
  }))
  .actions(self => ({
    setRadio(radio: AllCustomStatus): void {
      self.radio = radio;
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
        const fullItemsList: TBaseItemModel[] = [];

        const categories: TCategoryModel[] = categoriesList.map(
          category => ({
            id: category.id,
            name: category.name || category.value,
            list: [],
            selectedCount: 0,
            selected: false,
            tempSelected: false,
            code: category.code2,
          }),
        );
        if (withItems) {
          itemsList.forEach(item => {
            const parentId = item[self.parentField];
            const itemCategory = categories.find(category => {
              if (typeof parentId === 'string') {
                return category.code === parentId;
              }
              return category.id === parentId;
            });
            if (itemCategory) {
              itemCategory.list.push({
                id: item.id,
                name: item.name || item.value,
                parentId: itemCategory.id,
                selected: false,
                tempSelected: false,
              });
            } else if (
              categoriesForceAdd.includes(item.name?.toLowerCase()) &&
              !categories.find(
                category => category.name === item.name,
              )
            ) {
              categories.unshift({
                id: item.id,
                name: item.name || item.value,
                list: cast([]),
                selectedCount: 0,
                selected: false,
                tempSelected: false,
                code: item.code2,
              });
            }
            fullItemsList.push({
              id: item.id,
              parentId: itemCategory?.id,
            });
          });
        }

        self.fullItemsList = cast(fullItemsList);

        self.categoriesList = cast(categories);
        self.selectDataByEditIds();
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
        .filter(
          item =>
            item.selected &&
            (item.parentId ||
              categoriesForceAdd.includes(item.name?.toLowerCase())),
        )
        .map(item => item.id);
    },
  }))
  .actions(self => ({
    setEditData(data: IFullCampaignType): void {
      if (
        data[self.editSelectedCategoryField]?.length ||
        data[self.editSelectedItemField]?.length
      ) {
        self.setRadio(AllCustomStatus.CUSTOM);
        self.editSelectedCategoriesId =
          data[self.editSelectedCategoryField];
        self.editSelectedItemsId = data[self.editSelectedItemField];
      }
    },
  }));

export default BaseTagsAndCategoriesModel;
