import { cast } from 'mobx-state-tree';
// eslint-disable-next-line import/no-cycle
import {
  TCategoriesGroupByParentIdModel,
  TCategoryModel,
} from '../stores/models/Categories';

export const mapCategoriesByParent = (
  data: TCategoryModel[],
): { [key: number]: TCategoriesGroupByParentIdModel } => {
  const categoriesByParent: {
    [key: number]: TCategoriesGroupByParentIdModel;
  } = {};
  const categoriesParents: TCategoryModel[] = data.filter(
    item => !item.parent_id,
  );
  categoriesParents.forEach(parent => {
    categoriesByParent[parent.id] = {
      id: parent.id,
      name: parent.name,
      active: true,
      categories: cast([]),
    };
  });
  data.forEach(item => {
    if (item.parent_id) {
      categoriesByParent[item.parent_id].categories.push({
        ...item,
        selected: false,
        inBlackList: false,
        inTempBlackList: false,
      });
    }
  });

  return categoriesByParent;
};
