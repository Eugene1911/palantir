import { useState, useEffect } from 'react';
import {
  TCategoriesAPI,
  TCategoriesGroupByParentId,
} from 'sharedTypes';
import isEmpty from 'lodash/isEmpty';

export type TUseCategoriesSwitcherSelectorEvents = {
  onChangeSwitchHandler: (
    parentId: number,
    categories: Array<TCategoriesAPI>,
    isChecked: boolean,
  ) => void;
  onClickChipHandler: (id: number) => void;
  categorySwitchActive: Record<number, boolean>;
};

type TUseCategoriesSwitcherSelectorEventsProps = {
  value: Array<number>;
  onChange: (value: Array<number>) => void;
  categoriesList: Array<TCategoriesGroupByParentId>;
};

function useCategoriesSwitcherSelectorEvents({
  onChange,
  value,
  categoriesList,
}: TUseCategoriesSwitcherSelectorEventsProps): TUseCategoriesSwitcherSelectorEvents {
  const [categorySwitchActive, setCategorySwitchActive] = useState(
    {},
  );
  const onChangeSwitchHandler = (
    parentId: number,
    categories: Array<TCategoriesAPI>,
    isChecked: boolean,
  ): void => {
    const categoriesId = categories.map(({ id }) => id);

    if (isChecked) {
      onChange([...value, ...categoriesId]);
    } else {
      onChange(value.filter(id => !categoriesId.includes(id)));
    }

    setCategorySwitchActive({
      ...categorySwitchActive,
      [parentId]: isChecked,
    });
  };
  const onClickChipHandler = (id: number): void => {
    const hasValue = value.includes(id);

    if (hasValue) {
      onChange(value.filter(valueId => valueId !== id));
    } else {
      onChange([...value, id]);
    }
  };

  useEffect(() => {
    if (categoriesList.length && isEmpty(categorySwitchActive)) {
      const categorySwitchActiveInitial = {};

      categoriesList.forEach(({ id, categories }) => {
        categorySwitchActiveInitial[
          id
        ] = !!categories.find(category =>
          value.includes(category.id),
        );
      });

      setCategorySwitchActive(categorySwitchActiveInitial);
    }
  }, [categoriesList, categorySwitchActive, value]);

  return {
    categorySwitchActive,
    onChangeSwitchHandler,
    onClickChipHandler,
  };
}

export default useCategoriesSwitcherSelectorEvents;
