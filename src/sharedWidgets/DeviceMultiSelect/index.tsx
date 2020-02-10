import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ProgressLoaderMultiSelect from 'sharedComponents/ProgressLoaderMultiSelect';
import { TMultiSelectOnChangeHandler, TDeviceAPI } from 'sharedTypes';
import OptionDeviceMultiSelect from 'sharedComponents/OptionFilterMultiSelect';
import tagsForFilterMultiSelect from 'helpers/tagsForFilterMultiSelect';
import useFilterMultiSelect from 'helpers/useFilterMultiSelect';
import { getDevices } from 'resources/api';

export type TDeviceMultiSelectProps = {
  onChange: TMultiSelectOnChangeHandler<TDeviceAPI>;
  value: Array<number>;
};

function DeviceMultiSelect({
  onChange,
  value,
}: TDeviceMultiSelectProps): JSX.Element {
  const {
    isLoading,
    selectedValue,
    autocompleteData,
    onOpenHandler,
    onChangeHandler,
    getOptionLabel,
  } = useFilterMultiSelect(onChange, value, getDevices);

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
          label="Device"
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

DeviceMultiSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default DeviceMultiSelect;
