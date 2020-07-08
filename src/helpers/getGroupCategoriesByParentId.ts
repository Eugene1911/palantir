import {
  TCategoriesAPI,
  TCategoriesGroupByParentId,
} from 'sharedTypes';
import isArray from 'lodash/isArray';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';

function getGroupCategoriesByParentId(
  categoriesList: Array<TCategoriesAPI>,
): Array<TCategoriesGroupByParentId> {
  if (isArray(categoriesList)) {
    const categoriesGroupByParentId = groupBy(
      categoriesList,
      value => {
        if (value.parent_id) return value.parent_id;

        return value.id;
      },
    );

    return map(categoriesGroupByParentId, (value, key) => {
      const categories = value.filter(
        category => 'parent_id' in category,
      );
      const parent = value.find(({ id }) => id === Number(key));

      return {
        ...parent,
        categories,
      };
    });
  }

  return null;
}

export default getGroupCategoriesByParentId;
