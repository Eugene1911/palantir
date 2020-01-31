import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ProgressLoaderMultiSelect from 'sharedComponents/ProgressLoaderMultiSelect';
import useFormatMultiSelect from './services/useFormatMultiSelect';
import renderTagsFormatMultiSelect from './services/renderTagsFormatMultiSelect';
import renderOptionFormatMultiSelect from './services/renderOptionFormatMultiSelect';

function FormatMultiSelect({ onChange, value }) {
  const {
    isLoading,
    selectedValue,
    autocompleteData,
    onOpenHandler,
    onChangeHandler,
  } = useFormatMultiSelect(onChange, value);

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
      renderTags={renderTagsFormatMultiSelect}
      getOptionLabel={({ name }) => name}
      renderOption={renderOptionFormatMultiSelect}
      renderInput={params => (
        <TextField
          {...params}
          label="Format"
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

FormatMultiSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default FormatMultiSelect;
