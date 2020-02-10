import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ProgressLoaderMultiSelect from 'sharedComponents/ProgressLoaderMultiSelect';
import useSpotsAutocompleteMultiSelect from './services/useSpotsAutocompleteMultiSelect';

function SpotsAutocompleteMultiSelect({
  label,
  onChange,
  applicationsIds,
  spotsIds,
}) {
  const {
    isOpen,
    isLoading,
    selectedValue,
    autocompleteData,
    onOpenCloseHandler,
    renderTagsHandler,
    onChangeHandler,
    renderOptionHandler,
  } = useSpotsAutocompleteMultiSelect(
    label,
    onChange,
    spotsIds,
    applicationsIds,
  );

  return (
    <Autocomplete
      open={isOpen}
      multiple
      disableCloseOnSelect
      value={selectedValue}
      loading={isLoading}
      options={autocompleteData}
      onOpen={() => onOpenCloseHandler(true)}
      onClose={() => onOpenCloseHandler(false)}
      onChange={onChangeHandler}
      groupBy={({ application }) =>
        application ? application.name : null
      }
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

SpotsAutocompleteMultiSelect.propTypes = {
  applicationsIds: PropTypes.array,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

SpotsAutocompleteMultiSelect.defaultProps = {
  applicationsIds: [],
};

export default SpotsAutocompleteMultiSelect;
