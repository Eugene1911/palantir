import React, { useState } from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import useStyles from './useStyles';

interface IFilterSearchProps {
  inputText: string;
  setInputText: (text: string) => void;
  noPadding?: boolean;
}

const FilterSearch = ({
  inputText,
  setInputText,
  noPadding,
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
    </Box>
  );
};

export default FilterSearch;
