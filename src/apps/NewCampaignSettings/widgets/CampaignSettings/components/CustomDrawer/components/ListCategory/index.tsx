import React from 'react';

import match from 'autosuggest-highlight/match';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import CustomChip from '../../../CustomChip';
import useStyles from './useStyles';
// eslint-disable-next-line import/no-cycle
import ExpandIcon from '../ExpandIcon';
import ListItemName from '../ListItemName';
import ListItem, { IFilterListItem } from '../ListItem';

export interface IFilterCategoryItem {
  id: number;
  name: string;
  code?: string;
  list: IFilterListItem[];
  selectedCount: number;
  selected: boolean;
  tempSelected: boolean;
  groups?: string[];
}

interface IListCategoryProps {
  category: IFilterCategoryItem;
  inputText: string;
  isSelectedFilterActive: boolean;
  isAsyncLoadingList: boolean;
  isShowAsyncLoadButton: boolean;
  activeFilter: string;
  onSelect: (id: number, value: boolean, parentId?: number) => void;
  selectAllCategory: (id: number, value: boolean) => void;
  openAsyncFilter?: (category: IFilterCategoryItem) => void;
}

const ListCategory = ({
  category,
  inputText,
  isSelectedFilterActive,
  activeFilter,
  isAsyncLoadingList,
  isShowAsyncLoadButton,
  onSelect,
  selectAllCategory,
  openAsyncFilter,
}: IListCategoryProps): JSX.Element => {
  const classes = useStyles();

  // есть ли среди элементов категории хотя бы 1 выбранный
  const isSomeFilledListItem = category.list.some(
    item => !!match(item.name, inputText).length,
  );

  // фильтр по строке в поиске
  if (
    inputText &&
    !match(category.name, inputText).length &&
    !isSomeFilledListItem
  ) {
    return null;
  }

  // фильтр по правилу "Только выбранные"
  if (isSelectedFilterActive && !category.tempSelected) {
    return null;
  }

  // фильтр по группам
  if (activeFilter && !category.groups.includes(activeFilter)) {
    return null;
  }

  const handleClickSummary = (event): void => {
    event.stopPropagation();
    selectAllCategory(category.id, !category.tempSelected);
  };

  return (
    <Accordion
      classes={{ expanded: classes.accordionExpanded }}
      className={classes.accordion}
      key={category.id}
      TransitionProps={{ unmountOnExit: true }}
      expanded={isAsyncLoadingList ? false : undefined}
      square
    >
      <AccordionSummary
        className={classes.accordionSummary}
        expandIcon={
          <ExpandIcon
            isSomeFilledListItem={isSomeFilledListItem}
            isAsyncLoadingList={isAsyncLoadingList}
            isShowAsyncLoadButton={isShowAsyncLoadButton}
            category={category}
            openAsyncFilter={openAsyncFilter}
          />
        }
        classes={{
          expanded: classes.accordionSummaryExpanded,
          expandIcon: classes.accordionSummaryExpandIcon,
          content: classes.accordionSummaryContent,
        }}
        onClick={isAsyncLoadingList ? handleClickSummary : undefined}
      >
        <Checkbox
          onChange={(evt): void =>
            selectAllCategory(category.id, evt.target.checked)
          }
          onClick={(event): void => event.stopPropagation()}
          onFocus={(event): void => event.stopPropagation()}
          checked={category.tempSelected}
          color="primary"
          indeterminate={
            !!category.selectedCount && !category.tempSelected
          }
        />
        <ListItemName name={category.name} inputText={inputText} />
        {!!category.selectedCount && (
          <CustomChip
            label={category.selectedCount}
            isActive
            isSmall
            className={classes.count}
          />
        )}
      </AccordionSummary>
      {!!category.list.length && (
        <AccordionDetails className={classes.accordionDetails}>
          {category.list.map(item => (
            <ListItem
              item={item}
              noFilter
              inputText={inputText}
              onSelect={onSelect}
              key={item.id}
            />
          ))}
        </AccordionDetails>
      )}
    </Accordion>
  );
};

export default ListCategory;
