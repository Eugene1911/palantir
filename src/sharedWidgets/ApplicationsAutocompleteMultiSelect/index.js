import React, { forwardRef } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import useApplicationsAutocompleteMultiSelect from './services/useApplicationsAutocompleteMultiSelect';
import useStyles from './styles';

function ApplicationsAutocompleteMultiSelect(
  { selectedApplicationsIds, onChange },
  ref,
) {
  const classes = useStyles();
  const {
    applicationsList,
    renderInputHandler,
  } = useApplicationsAutocompleteMultiSelect();

  return (
    <div className={classes.main}>
      <Autocomplete
        className={classes.wrapper}
        ref={ref}
        disableCloseOnSelect
        value={null}
        onChange={onChange}
        getOptionLabel={({ name }) => name}
        options={applicationsList}
        onKeyDown={event => event.stopPropagation()}
        renderOption={option => (
          <>
            <Checkbox
              style={{ marginRight: 8 }}
              checked={selectedApplicationsIds.includes(option.id)}
            />
            {option.url}
          </>
        )}
        renderInput={renderInputHandler}
      />
    </div>
  );
}

// ApplicationsAutocompleteMultiSelect.propTypes = {
//   onChange: PropTypes.func.isRequired,
//   selectedApplicationsIds: PropTypes.array,
// };
// ApplicationsAutocompleteMultiSelect.defaultProps = {
//   selectedApplicationsIds: [],
// };

export default forwardRef(ApplicationsAutocompleteMultiSelect);
