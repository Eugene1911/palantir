import { IAnyType, IMSTMap } from 'mobx-state-tree';
// eslint-disable-next-line import/no-cycle
import {
  TCategoriesGroupByParentIdModel,
  TCategoryModel,
} from '../stores/models/Categories';

export const getAllTags = (
  categoriesList: TCategoriesGroupByParentIdModel[],
): TCategoryModel[] => {
  return categoriesList.reduce(
    (accumulator, currentValue) => [
      ...accumulator,
      ...currentValue.categories,
    ],
    [],
  );
};

export const applyCallbackToEveryTag = (
  categoriesList: IMSTMap<IAnyType>,
  callback: (tag: TCategoryModel) => void,
  onlyForActive?: boolean,
): void => {
  Array.from(categoriesList.keys()).forEach((key): void => {
    const category = categoriesList.get(key);
    if (!onlyForActive || (onlyForActive && category.active)) {
      category.categories.forEach((tag): void => {
        callback(tag);
      });
    }
  });
};
