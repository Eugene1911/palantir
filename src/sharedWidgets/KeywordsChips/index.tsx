import React from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import useKeywordsChips from './services/useKeywordsChips';
import useStyles from './useStyles';

export type TKeywordsChipsProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

function KeywordsChips({
  value,
  onChange,
}: TKeywordsChipsProps): JSX.Element {
  const classes = useStyles({});
  const {
    inputText,
    onChangeHandler,
    onKeyPressHandler,
    onDeleteKeywordHandler,
  } = useKeywordsChips({ value, onChange });

  return (
    <>
      <TextField
        label="Keywords"
        fullWidth
        multiline
        rowsMax={4}
        onKeyPress={onKeyPressHandler}
        value={inputText}
        onChange={onChangeHandler}
      />
      <div className={classes.chipsWrapper}>
        {value.map(keyword => (
          <Chip
            className={classes.chips}
            key={keyword}
            variant="outlined"
            color="primary"
            size="small"
            label={keyword}
            onDelete={(): void => onDeleteKeywordHandler(keyword)}
          />
        ))}
      </div>
    </>
  );
}

export default KeywordsChips;
