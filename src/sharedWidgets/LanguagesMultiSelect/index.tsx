import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ProgressLoaderMultiSelect from 'sharedComponents/ProgressLoaderMultiSelect';
import {
  TMultiSelectOnChangeHandler,
  TLanguagesAPI,
} from 'sharedTypes';
import OptionDeviceMultiSelect from 'sharedComponents/OptionFilterMultiSelect';
import tagsForFilterMultiSelect from 'helpers/tagsForFilterMultiSelect';
import { getLanguages } from 'resources/api';
import useFilterMultiSelect from 'helpers/useFilterMultiSelect';

export type TLanguagesMultiSelectProps = {
  onChange: TMultiSelectOnChangeHandler<TLanguagesAPI>;
  value: Array<number>;
};

function LanguagesMultiSelect({
  onChange,
  value,
}: TLanguagesMultiSelectProps): JSX.Element {
  const {
    isLoading,
    selectedValue,
    autocompleteData,
    onOpenHandler,
    onChangeHandler,
    getOptionLabel,
  } = useFilterMultiSelect(onChange, value, getLanguages);

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      value={selectedValue}
      loading={isLoading}
      options={autocompleteData}
      onOpen={onOpenHandler}
      onChange={onChangeHandler}
      disableClearable
      renderTags={tagsForFilterMultiSelect}
      getOptionLabel={getOptionLabel}
      renderOption={OptionDeviceMultiSelect}
      renderInput={(params): React.ReactNode => (
        <TextField
          {...params}
          label="Languages"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                <ProgressLoaderMultiSelect isLoading={isLoading} />
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          fullWidth
        />
      )}
    />
  );
}

export default LanguagesMultiSelect;
