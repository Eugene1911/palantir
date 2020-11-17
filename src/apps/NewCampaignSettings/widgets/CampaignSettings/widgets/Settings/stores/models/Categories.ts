import { cast, flow, Instance, types } from 'mobx-state-tree';
import {
  AllCustomStatus,
  INotification,
  LoadingStatus,
} from 'sharedTypes';
import { getCategories } from 'resources/api';
import { AddMode } from '../../constants/addMode';
// eslint-disable-next-line import/no-cycle
import {
  applyCallbackToEveryTag,
  getAllTags,
} from '../../services/getAllTags';
// eslint-disable-next-line import/no-cycle
import { mapCategoriesByParent } from '../../services/mapCategoriesByParent';

const CategoryModel = types.model({
  name: types.string,
  id: types.number,
  selected: types.boolean,
  inBlackList: types.boolean,
  inTempBlackList: types.boolean,
  // eslint-disable-next-line @typescript-eslint/camelcase
  parent_id: types.optional(types.maybe(types.number), undefined),
});

export type TCategoryModel = Instance<typeof CategoryModel>;

const CategoriesGroupByParentIdModel = types.model({
  name: types.string,
  id: types.number,
  active: types.boolean,
  categories: types.array(CategoryModel),
});

export type TCategoriesGroupByParentIdModel = Instance<
  typeof CategoriesGroupByParentIdModel
>;

export const InitialCategoriesModel = {
  categoriesList: {},
  categoriesRadio: AllCustomStatus.ALL,
  categoriesListStatus: LoadingStatus.INITIAL,
  addMode: AddMode.NORMAL,
};

const CategoriesModel = types
  .model({
    categoriesRadio: types.enumeration<AllCustomStatus>(
      Object.values(AllCustomStatus),
    ),
    categoriesList: types.map(CategoriesGroupByParentIdModel),
    categoriesListStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
    addMode: types.enumeration<AddMode>(Object.values(AddMode)),
  })
  .views(self => ({
    get selectedTags(): TCategoryModel[] {
      const activeCategories = Array.from(
        self.categoriesList.values(),
      ).filter(value => value.active);
      return getAllTags(activeCategories).filter(tag => tag.selected);
    },
    get blackListTags(): TCategoryModel[] {
      const activeCategories = Array.from(
        self.categoriesList.values(),
      ).filter(value => value.active);
      return getAllTags(activeCategories).filter(
        tag => tag.inBlackList,
      );
    },
    get tempBlackListTags(): TCategoryModel[] {
      const activeCategories = Array.from(
        self.categoriesList.values(),
      ).filter(value => value.active);
      return getAllTags(activeCategories).filter(
        tag => tag.inTempBlackList,
      );
    },
    get getAllAvailableTags(): TCategoryModel[] {
      const activeCategories = Array.from(
        self.categoriesList.values(),
      ).filter(value => value.active);
      if (self.addMode === AddMode.NORMAL) {
        return getAllTags(activeCategories).filter(
          tag => !tag.selected,
        );
      }
      return getAllTags(activeCategories).filter(
        tag => !tag.inTempBlackList && !tag.inBlackList,
      );
    },
    get isAllTagsSelected(): boolean {
      const activeCategories = Array.from(
        self.categoriesList.values(),
      ).filter(value => value.active);
      const allTags = getAllTags(activeCategories);
      return (
        allTags.every((tag): boolean => tag.selected) ||
        allTags.every(
          (tag): boolean => tag.inBlackList || tag.inTempBlackList,
        )
      );
    },
  }))
  .actions(self => ({
    setCategoriesRadio(categoriesRadio: AllCustomStatus): void {
      self.categoriesRadio = categoriesRadio;
    },
    toggleActiveCategory(id: string): void {
      self.categoriesList.get(id).active = !self.categoriesList.get(
        id,
      ).active;
    },
    toggleSelectedTag(tagId: number, categoryId: number): void {
      const tagIndex = self.categoriesList
        .get(categoryId.toString())
        .categories.findIndex(tag => tag.id === tagId);
      if (tagIndex !== -1) {
        const tag = self.categoriesList.get(categoryId.toString())
          .categories[tagIndex];
        if (self.addMode === AddMode.NORMAL) {
          tag.selected = !tag.selected;
          tag.inBlackList = false;
        } else {
          tag.inTempBlackList = !tag.inTempBlackList;
          tag.selected = false;
        }
      }
    },
    getCategoriesList: flow(function* getCategoriesList(
      infoNotification: (arg: INotification) => void,
    ) {
      self.categoriesListStatus = LoadingStatus.LOADING;
      try {
        const { data } = yield getCategories({});
        self.categoriesListStatus = LoadingStatus.SUCCESS;
        self.categoriesList = cast(mapCategoriesByParent(data));
      } catch (error) {
        self.categoriesListStatus = LoadingStatus.ERROR;

        infoNotification({
          variant: 'error',
          message: 'Categories loading error',
        });
      }
    }),
    toggleAddMode(save = false): void {
      if (self.addMode === AddMode.NORMAL) {
        self.addMode = AddMode.BLACKLIST;
      } else {
        self.addMode = AddMode.NORMAL;
        const callback = (tag: TCategoryModel): void => {
          if (save && tag.inTempBlackList) {
            tag.inTempBlackList = false;
            tag.inBlackList = true;
          } else if (tag.inTempBlackList) {
            tag.inTempBlackList = false;
          }
        };
        applyCallbackToEveryTag(self.categoriesList, callback);
      }
    },
    selectAllTags(): void {
      const localIsAllTagsSelected = self.isAllTagsSelected;
      const callback = (tag: TCategoryModel): void => {
        if (self.addMode === AddMode.NORMAL) {
          tag.inTempBlackList = false;
          tag.inBlackList = false;
          tag.selected = !localIsAllTagsSelected;
        } else {
          tag.inTempBlackList = !localIsAllTagsSelected;
          tag.inBlackList = false;
          tag.selected = false;
        }
      };
      applyCallbackToEveryTag(self.categoriesList, callback);
    },
    selectTagsBySearch(search: string): void {
      if (search) {
        let tagsArray = search.toLowerCase().split(',');
        tagsArray = tagsArray.map(word => word.trim());
        if (tagsArray?.length) {
          const callback = (tag: TCategoryModel): void => {
            if (tagsArray.includes(tag.name.toLowerCase())) {
              if (self.addMode === AddMode.NORMAL) {
                tag.inTempBlackList = false;
                tag.inBlackList = false;
                tag.selected = true;
              } else {
                tag.inTempBlackList = true;
                tag.inBlackList = false;
                tag.selected = false;
              }
            }
          };
          applyCallbackToEveryTag(self.categoriesList, callback);
        }
      }
    },
  }));

export type TCategoriesModel = Instance<typeof CategoriesModel>;

export default CategoriesModel;