import React from 'react';

import match from 'autosuggest-highlight/match';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemName from '../ListItemName';
import useStyles from './useStyles';

export interface IFilterListItem {
  id: number;
  name: string;
  parentId?: number;
  selected: boolean;
  tempSelected: boolean;
  asLabel?: boolean;
  isDefaultStyle?: boolean;
}

interface IListItemProps {
  item: IFilterListItem;
  noFilter: boolean;
  inputText: string;
  onSelect: (id: number, checked: boolean, parentId: number) => void;
}

const ListItem = ({
  item,
  noFilter,
  inputText,
  onSelect,
}: IListItemProps): JSX.Element => {
  const classes = useStyles();

  if (inputText && !match(item.name, inputText).length && !noFilter) {
    return null;
  }

  return (
    <Grid
      className={classes.item}
      alignItems="center"
      key={item.id}
      wrap="nowrap"
      container
    >
      <Grid item>
        <Checkbox
          onChange={(evt): void =>
            onSelect(item.id, evt.target.checked, item.parentId)
          }
          checked={item.tempSelected}
          color="primary"
        />
      </Grid>
      <Grid item>
        <ListItemName name={item.name} inputText={inputText} />
      </Grid>
    </Grid>
  );
};

export default ListItem;
