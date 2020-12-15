import React, { useEffect, useRef, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { LoadingStatus } from 'sharedTypes';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import AddICon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import FilterLoader from 'sharedComponents/loaders/FilterLoader';
import useStyles from './useStyles';
import CustomDrawer from '../CustomDrawer';
import { IFilterListItem } from '../CustomDrawer/components/ListItem';
import { IFilterCategoryItem } from '../CustomDrawer/components/ListCategory';
import CustomChip from '../CustomChip';
import { CLOSED_HEIGHT } from './constants/closedHeight';

interface IChipsWithFilterProps {
  list: IFilterListItem[];
  categoriesList?: IFilterCategoryItem[];
  onSelect: (id: number, value: boolean, parentId?: number) => void;
  selectAllCategory?: (id: number, value: boolean) => void;
  filterTitle: string;
  loadingStatus: LoadingStatus;
  permissionsStatus?: LoadingStatus;
  getList: (notification) => void;
  selectedCount?: number;
  onCancel: () => void;
  onSave: () => void;
  onDelete: (id: number, parentId?: number) => void;
  isAsyncLoadingList?: boolean;
  topFilterTitle?: string;
  filtersOptions?: Array<{ name: string; count: number } | null>;
  openAsyncFilter?: (category: IFilterCategoryItem) => void;
  topFilterPermission?: boolean;
  selectAllTags?: (value: boolean) => void;
  filterCategoriesFunction?: (
    category: IFilterCategoryItem,
  ) => boolean;
  invisibleBackdrop?: boolean;
}

const ChipsWithFilter = ({
  filterTitle,
  list,
  onSelect,
  loadingStatus,
  getList,
  selectedCount,
  onCancel,
  onSave,
  onDelete,
  categoriesList,
  selectAllCategory,
  isAsyncLoadingList,
  topFilterTitle,
  filtersOptions,
  openAsyncFilter,
  topFilterPermission,
  permissionsStatus = LoadingStatus.SUCCESS,
  selectAllTags,
  filterCategoriesFunction,
  invisibleBackdrop,
}: IChipsWithFilterProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();
  const [isClosedList, setIsClosedList] = useState<boolean>(false);
  const [isNeedShowAll, setIsNeedShowAll] = useState<boolean>(false);
  const classes = useStyles();
  const containerRef = useRef(null);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const toggleListClosed = (): void =>
    setIsClosedList(prevClosed => !prevClosed);

  const toggleFilterOpen = (): void =>
    setIsFilterOpen(prevOpen => !prevOpen);

  useEffect(() => {
    if (
      loadingStatus === LoadingStatus.INITIAL &&
      permissionsStatus === LoadingStatus.SUCCESS
    ) {
      getList(infoNotification);
    }
  }, [loadingStatus, getList, infoNotification, permissionsStatus]);

  const handleCancel = (): void => {
    toggleFilterOpen();
    onCancel();
  };

  const handleSave = (): void => {
    toggleFilterOpen();
    onSave();
  };

  const filteredList = list.filter(
    item => item.selected || item.asLabel,
  );

  useEffect(() => {
    const newIsNeedShowAll =
      containerRef.current?.clientHeight > CLOSED_HEIGHT;
    setIsNeedShowAll(newIsNeedShowAll);
    setIsClosedList(newIsNeedShowAll);
  }, [filteredList.length]);

  return (
    <>
      {loadingStatus === LoadingStatus.LOADING ? (
        <FilterLoader />
      ) : (
        <>
          <Box
            className={
              isClosedList
                ? classes.closedContainer
                : classes.container
            }
          >
            <Grid container ref={containerRef}>
              {filteredList.map(item => (
                <CustomChip
                  onDelete={
                    item.asLabel
                      ? undefined
                      : (): void => onDelete(item.id, item.parentId)
                  }
                  key={item.id}
                  label={item.name}
                  isActive={!item.isDefaultStyle}
                />
              ))}
              <Button
                className={classes.button}
                color="primary"
                startIcon={<AddICon />}
                onClick={toggleFilterOpen}
              >
                Add
              </Button>
            </Grid>
          </Box>
          {!!filteredList.length && isNeedShowAll && (
            <Button
              className={classes.button}
              color="primary"
              onClick={toggleListClosed}
            >
              {isClosedList ? 'Show all' : 'Close'}
            </Button>
          )}

          <CustomDrawer
            title={filterTitle}
            isOpen={isFilterOpen}
            list={list}
            onSelect={onSelect}
            selectedCount={selectedCount}
            onCancel={handleCancel}
            onSave={handleSave}
            categoriesList={categoriesList}
            selectAllCategory={selectAllCategory}
            isAsyncLoadingList={isAsyncLoadingList}
            topFilterTitle={topFilterTitle}
            filtersOptions={filtersOptions}
            openAsyncFilter={openAsyncFilter}
            topFilterPermission={topFilterPermission}
            selectAllTags={selectAllTags}
            filterCategoriesFunction={filterCategoriesFunction}
            invisibleBackdrop={invisibleBackdrop}
          />

          {!!filteredList.length && (
            <Button
              className={classes.editButton}
              color="primary"
              startIcon={<EditIcon />}
              onClick={toggleFilterOpen}
            >
              Edit
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default ChipsWithFilter;
