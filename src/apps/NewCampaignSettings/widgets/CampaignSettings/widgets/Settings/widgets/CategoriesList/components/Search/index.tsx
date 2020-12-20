import React, { ChangeEvent, useState, useRef } from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './useStyles';
import {
  TCategoriesModel,
  TCategoryModel,
} from '../../../../stores/models/Categories';

interface ISearchProps {
  categories?: TCategoriesModel;
}

const Search = ({ categories }: ISearchProps): JSX.Element => {
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const inputRef = useRef();

  const handleChangeSearch = (
    event: ChangeEvent<{}>,
    value: string | TCategoryModel,
  ): void => {
    if (typeof value === 'object' && value) {
      categories.toggleSelectedTag(value.id, value.parent_id);
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
      categories.selectTagsBySearch(inputText);

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
          key={categories.getAllAvailableTags.length}
          options={categories.getAllAvailableTags}
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
            onClick={categories.selectAllTags}
            className={classes.select}
            color="primary"
          >
            {categories.isAllTagsSelected
              ? 'DeSelect all tags'
              : 'Select all Tags'}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default inject(({ newCampaignSettings }) => ({
  categories: newCampaignSettings.settings.categories,
}))(observer(Search));
