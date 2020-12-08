import { cast } from 'mobx-state-tree';
// eslint-disable-next-line import/no-cycle
import {
  TCategoriesGroupByParentIdModel,
  TCategoryModel,
} from '../stores/models/Categories';
import { hiddenCategories } from '../constants/hiddenCategories';

export const mapCategoriesByParent = (
  data: TCategoryModel[],
  permission: boolean,
  editSelectedId: number[],
): { [key: number]: TCategoriesGroupByParentIdModel } => {
  const categoriesByParent: {
    [key: number]: TCategoriesGroupByParentIdModel;
  } = {};
  const categoriesParents: TCategoryModel[] = data.filter(
    item => !item.parent_id,
  );
  categoriesParents
    .filter(
      item =>
        !hiddenCategories.includes(item.name) ||
        (hiddenCategories.includes(item.name) && permission),
    )
    .forEach(parent => {
      categoriesByParent[parent.id] = {
        id: parent.id,
        name: parent.name,
        active: true,
        categories: cast([]),
      };
    });
  data.forEach(item => {
    if (item.parent_id && categoriesByParent[item.parent_id]) {
      categoriesByParent[item.parent_id].categories.push({
        ...item,
        selected: editSelectedId.includes(item.id),
        inBlackList: false,
        inTempBlackList: false,
      });
    }
  });

  return categoriesByParent;
};
