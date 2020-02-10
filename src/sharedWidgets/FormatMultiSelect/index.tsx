import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ProgressLoaderMultiSelect from 'sharedComponents/ProgressLoaderMultiSelect';
import { TMultiSelectOnChangeHandler, TFormatAPI } from 'sharedTypes';
import OptionFormatMultiSelect from 'sharedComponents/OptionFilterMultiSelect';
import tagsForFilterMultiSelect from 'helpers/tagsForFilterMultiSelect';
import useFormatMultiSelect, {
  TUseFormatMultiSelect,
} from './services/useFormatMultiSelect';

export type TFormatMultiSelectProps = {
  onChange: TMultiSelectOnChangeHandler<TFormatAPI>;
  value: Array<number>;
};

function FormatMultiSelect({
  onChange,
  value,
}: TFormatMultiSelectProps): JSX.Element {
  const {
    isLoading,
    selectedValue,
    autocompleteData,
    onOpenHandler,
    onChangeHandler,
    getOptionLabel,
  }: TUseFormatMultiSelect = useFormatMultiSelect(onChange, value);

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
      renderOption={OptionFormatMultiSelect}
      renderInput={(params): JSX.Element => (
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
