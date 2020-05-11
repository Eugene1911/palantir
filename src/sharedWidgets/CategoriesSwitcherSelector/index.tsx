import React from 'react';
import Chip from '@material-ui/core/Chip';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
import isEmpty from 'lodash/isEmpty';
import CategoriesSwitcherSelectorLoader from 'sharedComponents/loaders/CategoriesSwitcherSelectorLoader';
import useCategoriesSwitcherSelector, {
  TUseCategoriesSwitcherSelector,
} from './services/useCategoriesSwitcherSelector';
import useCategoriesSwitcherSelectorEvents, {
  TUseCategoriesSwitcherSelectorEvents,
} from './services/useCategoriesSwitcherSelectorEvents';

type TCategoriesSwitcherSelector = {
  value: Array<number>;
  onChange: (value: Array<number>) => void;
};

function CategoriesSwitcherSelector({
  value,
  onChange,
}: TCategoriesSwitcherSelector): JSX.Element {
  const {
    classes,
    isLoadingCategories,
    categoriesList,
  }: TUseCategoriesSwitcherSelector = useCategoriesSwitcherSelector();
  const {
    categorySwitchActive,
    onChangeSwitchHandler,
    onClickChipHandler,
  }: TUseCategoriesSwitcherSelectorEvents = useCategoriesSwitcherSelectorEvents(
    {
      value,
      onChange,
      categoriesList,
    },
  );

  if (isLoadingCategories)
    return <CategoriesSwitcherSelectorLoader />;

  if (
    !categoriesList ||
    !categoriesList.length ||
    isEmpty(categorySwitchActive)
  )
    return <p>No Categories</p>;

  return (
    <div>
      {categoriesList.map(({ name, id, categories }) => (
        <div key={id}>
          <FormControlLabel
            className={classes.switch}
            control={
              <Switch
                checked={!!categorySwitchActive[id]}
                value={id}
                size="small"
                onChange={(_, checked: boolean): void =>
                  onChangeSwitchHandler(id, categories, checked)
                }
              />
            }
            labelPlacement="end"
            label={name}
          />
          <Collapse in={!!categorySwitchActive[id]}>
            <div className={classes.chipWrapper}>
              {categories.map(category => (
                <Chip
                  className={classes.chip}
                  key={category.id}
                  variant="default"
                  size="small"
                  label={category.name}
                  clickable
                  color={
                    value.includes(category.id)
                      ? 'primary'
                      : 'default'
                  }
                  onClick={(): void =>
                    onClickChipHandler(category.id)
                  }
                />
              ))}
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
}

export default CategoriesSwitcherSelector;
