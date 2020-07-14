import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import useIncludeExcludeSwitchList from './services/useIncludeExcludeSwitchList';

export type TIncludeExcludeSwitchListProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

function IncludeExcludeSwitchList({
  value,
  onChange,
}: TIncludeExcludeSwitchListProps): JSX.Element {
  const {
    onKeyPressHandler,
    inputText,
    onChangeHandler,
    switchValue,
    setSwitchValue,
    classes,
    getButtonClass,
    includeExcludeButtons,
    onClickRemoveAllHandler,
    onDeleteWordHandler,
  } = useIncludeExcludeSwitchList({ value, onChange });

  return (
    <div>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <ButtonGroup size="small" variant="contained">
            {includeExcludeButtons.map(name => (
              <Button
                className={getButtonClass(name)}
                color={switchValue === name ? 'primary' : 'default'}
                key={name}
                onClick={(): void => setSwitchValue(name)}
              >
                {name}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid item xs>
          <TextField
            label={switchValue}
            multiline
            rowsMax="4"
            fullWidth
            onKeyPress={onKeyPressHandler}
            value={inputText}
            onChange={onChangeHandler}
          />
        </Grid>
      </Grid>
      {!!value.length && (
        <div className={classes.chipsContainer}>
          <IconButton
            className={classes.chipsCloseButton}
            onClick={onClickRemoveAllHandler}
            size="small"
          >
            <CloseIcon />
          </IconButton>
          <div className={classes.chipsWrapper}>
            {value.map(word => (
              <Chip
                key={word}
                classes={{
                  outlined: classes.chipOutlined,
                  deleteIconSmall: classes.chipDeleteIconSmall,
                }}
                variant="outlined"
                size="small"
                label={word}
                onDelete={(): void => onDeleteWordHandler(word)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default IncludeExcludeSwitchList;
