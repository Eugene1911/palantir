import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ApplicationsAutocompleteMultiSelect from 'sharedWidgets/ApplicationsAutocompleteMultiSelect';

function ApplicationsMultiSelect() {
  const [selectedApplications, setSelectedApplications] = useState(
    [],
  );
  const onChangeApplication = (event, app) => {
    if (app) {
      const selectedIndex = selectedApplications.findIndex(
        ({ id }) => id === app.id,
      );

      if (selectedIndex >= 0) {
        selectedApplications.splice(selectedIndex, 1);
      } else {
        selectedApplications.push(app);
      }

      setSelectedApplications([...selectedApplications]);
    }
  };
  const selectedApplicationsIds = selectedApplications.map(
    ({ id }) => id,
  );
  const refAc = React.createRef();

  return (
    <FormControl fullWidth>
      <InputLabel shrink htmlFor="applications">
        Applications
      </InputLabel>
      <Select
        displayEmpty
        name="applications"
        multiple
        onChange={(event, { props }) => {
          const { value } = props;
          if (value === 'all') {
            setSelectedApplications([]);
          } else {
            onChangeApplication(null, { id: props.value });
          }
        }}
        renderValue={selected => {
          if (!selected || !selected.length)
            return <Typography noWrap>All</Typography>;

          const selectedLength = selected.length;

          if (selectedLength > 4) {
            return (
              <Typography noWrap>
                {`Selected applications: ${selectedLength}`}
              </Typography>
            );
          }

          const applicationsSelectedList = selectedApplications
            .filter(({ id }) => selected.includes(id))
            .map(({ name }) => name)
            .join(', ');

          return (
            <Typography noWrap>{applicationsSelectedList}</Typography>
          );
        }}
        value={selectedApplicationsIds}
      >
        <ApplicationsAutocompleteMultiSelect
          ref={refAc}
          selectedApplicationsIds={selectedApplicationsIds}
          onChange={onChangeApplication}
        />
        <MenuItem value="all">
          <Checkbox
            checked={!selectedApplicationsIds.length}
            indeterminate
          />
          <ListItemText primary="All" />
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

export default ApplicationsMultiSelect;
