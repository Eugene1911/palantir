import React, { useState } from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import useStyles from './useStyles';
import { IFilterCategoryItem } from '../ListCategory';

interface IFilterSearchProps {
  inputText: string;
  setInputText: (text: string) => void;
  noPadding?: boolean;
  selectAllTags?: (
    value: boolean,
    filterCategoriesFunction?: (
      category: IFilterCategoryItem,
    ) => boolean,
  ) => void;
  selectedCount?: number;
  filterCategoriesFunction?: (
    category: IFilterCategoryItem,
  ) => boolean;
}

const FilterSearch = ({
  inputText,
  setInputText,
  noPadding,
  selectAllTags,
  selectedCount,
  filterCategoriesFunction,
}: IFilterSearchProps): JSX.Element => {
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <Box className={noPadding ? classes.noPadding : classes.search}>
      <TextField
        placeholder="Search"
        variant="standard"
        fullWidth
        InputProps={{
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
        onChange={(evt): void =>
          setInputText(evt.target.value as string)
        }
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{
          onFocus: (): void => setIsFocused(true),
          onBlur: (): void => setIsFocused(false),
          value: inputText,
        }}
      />
      {selectAllTags && (
        <Box className={classes.buttonWrapper}>
          <Button
            color="primary"
            onClick={(): void =>
              selectAllTags(!selectedCount, filterCategoriesFunction)
            }
            className={classes.button}
          >
            {selectedCount ? 'DeSelect all' : 'Select All'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FilterSearch;
