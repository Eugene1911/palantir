import React, { useState } from 'react';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import useStyles from './useStyles';
import GroupFilter from '../GroupFilter';

interface IBottomFilterProps {
  isSelectedFilterActive: boolean;
  activeFilter: string;
  selectedCount: number;
  filtersOptions: Array<{ name: string; count: number } | null>;
  toggleSelectedFilter: () => void;
  clearAllFilters: () => void;
  handleSetActiveFilter: (filter: string) => void;
}

const BottomFilter = ({
  isSelectedFilterActive,
  activeFilter,
  selectedCount,
  filtersOptions,
  toggleSelectedFilter,
  clearAllFilters,
  handleSetActiveFilter,
}: IBottomFilterProps): JSX.Element => {
  const classes = useStyles();
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);

  const toggleShowFilter = (): void =>
    setIsShowFilter(prevShow => !prevShow);

  return (
    <>
      <Box className={classes.topFilter}>
        <Grid
          justify="space-between"
          alignItems="center"
          container
          className={classes.filter}
        >
          <Grid item>
            <Typography className={classes.filterTitle}>
              FILTER
            </Typography>
          </Grid>
          <Typography className={classes.filterText}>
            {isSelectedFilterActive ? 'Selected' : activeFilter}
          </Typography>
          <Grid item>
            <IconButton
              onClick={toggleShowFilter}
              size="small"
              className={classes.filterButton}
            >
              <ChevronRightIcon className={classes.close} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <GroupFilter
        selectedCount={selectedCount}
        filtersOptions={filtersOptions}
        isShowFilter={isShowFilter}
        isSelectedFilterActive={isSelectedFilterActive}
        toggleShowFilter={toggleShowFilter}
        toggleSelectedFilter={toggleSelectedFilter}
        clearAllFilters={clearAllFilters}
        handleSetActiveFilter={handleSetActiveFilter}
        activeFilter={activeFilter}
      />
    </>
  );
};

export default BottomFilter;
