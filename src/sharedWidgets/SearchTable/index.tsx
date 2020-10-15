import React from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import useSearchTable, {
  TuseSearchTable,
} from './services/useSearchTable';

type TSearchTable = {
  placeholder: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

function SearchTable({
  placeholder,
  onChange,
}: TSearchTable): JSX.Element {
  const {
    isFocusSearch,
    onBlurFocusHandler,
  }: TuseSearchTable = useSearchTable();

  return (
    <FormControl fullWidth>
      <Input
        fullWidth
        onFocus={onBlurFocusHandler}
        onBlur={onBlurFocusHandler}
        onChange={onChange}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon
              color={isFocusSearch ? 'primary' : 'disabled'}
            />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default SearchTable;
