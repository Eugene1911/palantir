import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ProgressLoaderMultiSelect from 'sharedComponents/ProgressLoaderMultiSelect';
import { TMultiSelectOnChangeHandler, TOSAPI } from 'sharedTypes';
import OptionDeviceMultiSelect from 'sharedComponents/OptionFilterMultiSelect';
import tagsForFilterMultiSelect from 'helpers/tagsForFilterMultiSelect';
import { getOSes } from 'resources/api';
import useFilterMultiSelect from 'helpers/useFilterMultiSelect';

export type TOSMultiSelectProps = {
  onChange: TMultiSelectOnChangeHandler<TOSAPI>;
  value: Array<number>;
};

function OSMultiSelect({
  onChange,
  value,
}: TOSMultiSelectProps): JSX.Element {
  const {
    isLoading,
    selectedValue,
    autocompleteData,
    onOpenHandler,
    onChangeHandler,
    getOptionLabel,
  } = useFilterMultiSelect(onChange, value, getOSes);

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
          label="OS"
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

export default OSMultiSelect;
