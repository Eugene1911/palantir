import { cast, flow, Instance, types } from 'mobx-state-tree';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
import cloneDeep from 'lodash/cloneDeep';
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
import { TPermissionsStore } from '../../../../stores/PermissionsStore';
import { hiddenCategories } from '../../constants/hiddenCategories';
import { noHiddenCategoriesAdFormats } from '../../constants/permissionsForAdFormats';

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
  categoriesListGlobal: {},
  categoriesRadio: AllCustomStatus.ALL,
  categoriesListStatus: LoadingStatus.INITIAL,
  addMode: AddMode.NORMAL,
  editSelectedId: [],
};

const CategoriesModel = types
  .model({
    categoriesRadio: types.enumeration<AllCustomStatus>(
      Object.values(AllCustomStatus),
    ),
    categoriesList: types.map(CategoriesGroupByParentIdModel),
    categoriesListGlobal: types.map(CategoriesGroupByParentIdModel),
    categoriesListStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
    editSelectedId: types.array(types.number),
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
    filterCategoriesByAdFormat(adFormatName: string): void {
      const result = {};
      Array.from(self.categoriesListGlobal.keys()).forEach(
        (key): void => {
          if (
            !adFormatName ||
            !hiddenCategories.includes(
              self.categoriesListGlobal.get(key).name,
            ) ||
            !noHiddenCategoriesAdFormats.includes(adFormatName)
          ) {
            if (self.categoriesList.get(key)) {
              result[key] = cloneDeep({
                ...self.categoriesListGlobal.get(key),
                active: self.categoriesList.get(key).active,
                categories: self.categoriesList.get(key).categories,
              });
            } else {
              result[key] = cloneDeep(
                self.categoriesListGlobal.get(key),
              );
            }
          }
        },
      );
      self.categoriesList = cast(result);
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
      permissions: TPermissionsStore,
      adFormat: string,
    ) {
      self.categoriesListStatus = LoadingStatus.LOADING;
      try {
        const { data } = yield getCategories({});
        self.categoriesListStatus = LoadingStatus.SUCCESS;
        const categoriesList = mapCategoriesByParent(
          data,
          permissions.canSetupHiddenCategories,
          self.editSelectedId,
        );
        self.categoriesListGlobal = cast(categoriesList);
        self.categoriesList = cast(categoriesList);

        if (adFormat) {
          self.filterCategoriesByAdFormat(adFormat);
        }
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
    getResultData(): number[] {
      if (self.categoriesRadio === AllCustomStatus.ALL) {
        return [];
      }
      return self.selectedTags.map(tag => tag.id);
    },
  }))
  .actions(self => ({
    setEditData(data: IFullCampaignType): void {
      if (data.categories && data.categories.length) {
        self.setCategoriesRadio(AllCustomStatus.CUSTOM);
        self.editSelectedId = cast(data.categories);
      }
    },
  }));

export type TCategoriesModel = Instance<typeof CategoriesModel>;

export default CategoriesModel;
