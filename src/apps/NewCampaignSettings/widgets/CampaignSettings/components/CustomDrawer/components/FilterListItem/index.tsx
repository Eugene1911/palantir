import React from 'react';
import cn from 'classnames';

import CheckIcon from '@material-ui/icons/Check';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import uuid from 'react-uuid';
import CustomChip from '../../../CustomChip';
import useStyles from './useStyles';

interface IFilterListItemProps {
  item: string;
  isSelected: boolean;
  onSelectFilter: (item: string) => void;
  count: number;
}

const FilterListItem = ({
  item,
  isSelected,
  onSelectFilter,
  count,
}: IFilterListItemProps): JSX.Element => {
  const classes = useStyles();

  if (!item) {
    return <Divider key={uuid()} className={classes.divider} />;
  }

  return (
    <Grid
      container
      alignItems="center"
      onClick={(): void => onSelectFilter(item)}
      className={classes.filterItem}
      key={item + count}
    >
      <Grid item>
        <CheckIcon
          color="primary"
          className={cn(classes.activeFilterIcon, {
            [classes.hiddenIcon]: !isSelected,
          })}
        />
      </Grid>
      <Grid item>
        <Typography
          color={isSelected ? 'primary' : undefined}
          className={classes.itemName}
        >
          {item}
        </Typography>
      </Grid>
      {isSelected && (
        <CustomChip
          className={classes.filterCounter}
          label={count}
          isActive
          isSmall
        />
      )}
    </Grid>
  );
};

export default FilterListItem;
