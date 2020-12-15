import React from 'react';

import cn from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import uuid from 'react-uuid';
import FilterListItem from '../FilterListItem';
import useStyles from './useStyles';
import FilterHeader from '../FilterHeader';

interface IGroupFilterProps {
  selectedCount: number;
  filtersOptions: Array<{ name: string; count: number } | null>;
  isShowFilter: boolean;
  isSelectedFilterActive: boolean;
  toggleShowFilter: () => void;
  toggleSelectedFilter: () => void;
  clearAllFilters: () => void;
  handleSetActiveFilter: (filter: string) => void;
  activeFilter: string;
}

const GroupFilter = ({
  selectedCount,
  filtersOptions,
  isShowFilter,
  toggleShowFilter,
  clearAllFilters,
  isSelectedFilterActive,
  toggleSelectedFilter,
  activeFilter,
  handleSetActiveFilter,
}: IGroupFilterProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="right"
      open={isShowFilter}
      onClose={toggleShowFilter}
      ModalProps={{ BackdropProps: { invisible: true } }}
    >
      <FilterHeader
        onCancel={toggleShowFilter}
        title="Filter"
        withBackButton
        withClearButton
        clearAllFilters={clearAllFilters}
      />
      <Container
        className={cn(classes.content, classes.filterContent)}
      >
        <FilterListItem
          item="Selected"
          isSelected={isSelectedFilterActive}
          onSelectFilter={toggleSelectedFilter}
          count={selectedCount}
        />
        <Divider className={classes.divider} />
        {filtersOptions.map(option => (
          <FilterListItem
            item={option?.name}
            isSelected={option?.name === activeFilter}
            onSelectFilter={handleSetActiveFilter}
            count={option?.count}
            key={uuid()}
          />
        ))}
      </Container>
    </Drawer>
  );
};

export default GroupFilter;
