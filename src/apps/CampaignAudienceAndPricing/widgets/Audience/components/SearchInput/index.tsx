import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { enterText } from '../../../../assets/commonTypes';

interface ISearchInputProps {
  onKeyPressHandler: (
    event?: React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  placeholder: string;
  inputText: string;
  onInputChange: ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput(props?: ISearchInputProps): JSX.Element {
  const {
    onKeyPressHandler,
    placeholder,
    inputText,
    onInputChange,
  } = props;

  return (
    <TextField
      placeholder={placeholder}
      multiline
      rowsMax="4"
      fullWidth
      onKeyPress={onKeyPressHandler}
      value={inputText}
      onChange={onInputChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="secondary" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {Boolean(inputText) && (
              <Typography
                onClick={() => onKeyPressHandler()}
                color="textSecondary"
                variant="caption"
              >
                {enterText}
              </Typography>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchInput;
export { useSearchInput } from './useSearchInput';
