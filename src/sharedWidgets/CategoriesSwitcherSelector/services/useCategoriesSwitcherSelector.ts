import { useState, useEffect } from 'react';
import { getCategories } from 'resources/api';
import { TCategoriesGroupByParentId } from 'sharedTypes';
import getGroupCategoriesByParentId from 'helpers/getGroupCategoriesByParentId';
import useStyles, {
  TCategoriesSwitcherSelectorClasses,
} from '../useStyles';

export type TUseCategoriesSwitcherSelector = {
  categoriesList: Array<TCategoriesGroupByParentId>;
  isLoadingCategories: boolean;
  classes: Record<TCategoriesSwitcherSelectorClasses, string>;
};

function useCategoriesSwitcherSelector(): TUseCategoriesSwitcherSelector {
  const classes = useStyles({});
  const [isLoadingCategories, setIsLoadingCategories] = useState(
    true,
  );
  const [categoriesList, setCategoriesList] = useState<
    Array<TCategoriesGroupByParentId>
  >([]);

  useEffect(() => {
    getCategories({})
      .then(({ data }): void => {
        const groupCategoriesByParentId = getGroupCategoriesByParentId(
          data,
        );

        if (groupCategoriesByParentId) {
          setIsLoadingCategories(false);
          setCategoriesList(groupCategoriesByParentId);
        }
      })
      .catch((): void => setIsLoadingCategories(false));
  }, []);

  return {
    classes,
    isLoadingCategories,
    categoriesList,
  };
}

export default useCategoriesSwitcherSelector;
