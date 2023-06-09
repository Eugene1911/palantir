import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ApplicationsAutocompleteMultiSelect from 'sharedWidgets/ApplicationsAutocompleteMultiSelect';
import useApplicationsMultiSelect from './services/useApplicationsMultiSelect';
import ApplicationMultiSelectSelectValue from './components/ApplicationMultiSelectSelectValue';

function ApplicationsMultiSelect({ applicationsIds, onChange }) {
  const {
    t,
    selectedApplications,
    onChangeApplicationHandler,
    onChangeSeleactHandler,
    applicationsAutocompleteMultiSelectRef,
  } = useApplicationsMultiSelect(applicationsIds, onChange);

  return (
    <FormControl fullWidth>
      <InputLabel shrink htmlFor="applications">
        {t('common:form.applications')}
      </InputLabel>
      <Select
        displayEmpty
        name="applications"
        multiple
        onChange={onChangeSeleactHandler}
        renderValue={ApplicationMultiSelectSelectValue(
          selectedApplications,
          t,
        )}
        value={applicationsIds}
      >
        <ApplicationsAutocompleteMultiSelect
          ref={applicationsAutocompleteMultiSelectRef}
          selectedApplicationsIds={applicationsIds}
          onChange={onChangeApplicationHandler}
        />
        <MenuItem value="all">
          <Checkbox checked={!applicationsIds.length} indeterminate />
          <ListItemText primary={t('common:form.all')} />
        </MenuItem>
        {selectedApplications.map(app => (
          <MenuItem key={app.id} value={app.id}>
            <Checkbox checked />
            <ListItemText primary={app.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

ApplicationsMultiSelect.propTypes = {
  applicationsIds: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};
ApplicationsMultiSelect.defaultProps = {
  applicationsIds: [],
};

export default ApplicationsMultiSelect;
