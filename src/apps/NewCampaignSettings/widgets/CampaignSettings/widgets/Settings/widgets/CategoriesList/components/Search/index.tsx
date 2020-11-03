import React, { ChangeEvent, useState, useRef } from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import {
  TCategoryModel,
  TSettingsModel,
} from '../../../../stores/SettingsStore';
import useStyles from './useStyles';

interface ISearchProps {
  settings?: TSettingsModel;
}

const Search = ({ settings }: ISearchProps): JSX.Element => {
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const inputRef = useRef();

  const handleChangeSearch = (
    event: ChangeEvent<{}>,
    value: string | TCategoryModel,
  ): void => {
    if (typeof value === 'object' && value) {
      settings.toggleSelectedTag(value.id, value.parent_id);
      setInputText('');
    }
  };

  const onKeyPressHandler = (
    event: React.KeyboardEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ): void => {
    const { key } = event;

    if (key === 'Enter') {
      settings.selectTagsBySearch(inputText);

      setInputText('');
    }
  };

  return (
    <Grid
      className={classes.container}
      container
      alignItems="flex-end"
      wrap="nowrap"
    >
      <Grid
        className={isFocused ? classes.focusedContainer : undefined}
        xs={!isFocused ? 6 : undefined}
        item
      >
        <Autocomplete
          options={settings.getAllAvailableTags}
          getOptionLabel={(option: TCategoryModel): string =>
            option.name
          }
          classes={{ popper: classes.popper }}
          disablePortal
          onChange={handleChangeSearch}
          onInputChange={(evt, value): void => setInputText(value)}
          blurOnSelect
          clearOnBlur
          clearOnEscape
          ref={inputRef}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          renderInput={(params: any): JSX.Element => (
            <TextField
              {...params} // eslint-disable-line react/jsx-props-no-spreading
              placeholder="Type tags name"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      className={
                        isFocused ? classes.focusedIcon : classes.icon
                      }
                    />
                  </InputAdornment>
                ),
              }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              inputProps={{
                ...params.inputProps,
                onFocus: (evt): void => {
                  if (params.inputProps.onFocus) {
                    params.inputProps.onFocus(evt);
                  }
                  setIsFocused(true);
                },
                onBlur: (evt): void => {
                  if (params.inputProps.onBlur) {
                    params.inputProps.onBlur(evt);
                  }
                  setIsFocused(false);
                },
                onKeyPress: (evt): void => {
                  if (params.inputProps.onKeyPress) {
                    params.inputProps.onKeyPress(evt);
                  }
                  onKeyPressHandler(evt);
                },
                value: inputText,
              }}
            />
          )}
        />
      </Grid>
      {!isFocused && (
        <Grid item>
          <Button
            onClick={settings.selectAllTags}
            className={classes.select}
            color="primary"
          >
            {settings.isAllTagsSelected
              ? 'DeSelect all tags'
              : 'Select all Tags'}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default inject(({ newCampaignSettings }) => ({
  settings: newCampaignSettings.settings,
}))(observer(Search));
