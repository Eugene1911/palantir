import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import { LoadingStatus } from 'sharedTypes';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import AddICon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import FilterLoader from 'sharedComponents/loaders/FilterLoader';
import useStyles from './useStyles';
import CustomDrawer, {
  IFilterCategoryItem,
  IFilterListItem,
} from '../CustomDrawer';
import CustomChip from '../CustomChip';

interface IChipsWithFilterProps {
  list: IFilterListItem[];
  categoriesList?: IFilterCategoryItem[];
  onSelect: (id: number, value: boolean, parentId?: number) => void;
  selectAllCategory?: (id: number, value: boolean) => void;
  filterTitle: string;
  loadingStatus: LoadingStatus;
  getList: (notification) => void;
  selectedCount?: number;
  onCancel: () => void;
  onSave: () => void;
  onDelete: (id: number, parentId?: number) => void;
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
}: IChipsWithFilterProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();
  const classes = useStyles();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const toggleFilterOpen = (): void =>
    setIsFilterOpen(prevOpen => !prevOpen);

  useEffect(() => {
    if (loadingStatus === LoadingStatus.INITIAL) {
      getList(infoNotification);
    }
  }, [loadingStatus, getList, infoNotification]);

  const handleCancel = (): void => {
    toggleFilterOpen();
    onCancel();
  };

  const handleSave = (): void => {
    toggleFilterOpen();
    onSave();
  };

  return (
    <>
      {loadingStatus === LoadingStatus.LOADING ? (
        <FilterLoader />
      ) : (
        <>
          <Grid className={classes.container} container>
            {list
              .filter(item => item.selected)
              .map(item => (
                <CustomChip
                  onDelete={(): void =>
                    onDelete(item.id, item.parentId)
                  }
                  key={item.id}
                  label={item.name}
                  isActive
                />
              ))}
            <Button
              className={classes.button}
              color="primary"
              startIcon={<AddICon />}
              onClick={toggleFilterOpen}
            >
              Add custom
            </Button>
          </Grid>

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
          />
        </>
      )}
    </>
  );
};

export default ChipsWithFilter;
