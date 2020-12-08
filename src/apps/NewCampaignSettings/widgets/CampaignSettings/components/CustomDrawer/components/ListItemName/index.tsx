import React from 'react';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Typography from '@material-ui/core/Typography';
import uuid from 'react-uuid';
import useStyles from './useStyles';

interface IListItemNameProps {
  name: string;
  inputText: string;
}

const ListItemName = ({
  name,
  inputText,
}: IListItemNameProps): JSX.Element => {
  const classes = useStyles();

  const matches = match(name, inputText);
  const parts = parse(name, matches);

  return (
    <>
      {parts.map(part => (
        <Typography
          key={uuid()}
          component="span"
          className={
            part.highlight ? classes.filledItemName : classes.itemName
          }
        >
          {part.text}
        </Typography>
      ))}
    </>
  );
};

export default ListItemName;
