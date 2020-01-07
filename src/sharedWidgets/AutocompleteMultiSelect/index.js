import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ProgressLoaderMultiSelect from 'sharedComponents/ProgressLoaderMultiSelect';
import useAutocompleteMultiSelect from './services/useAutocompleteMultiSelect';

function AutocompleteMultiSelect({
  label,
  onChange,
  functionRequestData,
}) {
  const {
    isLoading,
    selectedValue,
    autocompleteData,
    onOpenHandler,
    renderTagsHandler,
    onChangeHandler,
    renderOptionHandler,
  } = useAutocompleteMultiSelect(
    label,
    onChange,
    functionRequestData,
  );

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
      renderTags={renderTagsHandler}
      getOptionLabel={({ name }) => name}
      renderOption={renderOptionHandler}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
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

AutocompleteMultiSelect.propTypes = {
  functionRequestData: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AutocompleteMultiSelect;
