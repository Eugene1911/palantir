import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { getApplications } from 'resources/api';
import useStyles from './styles';

const ApplicationsAutocompleteMultiSelect = React.forwardRef(
  function ApplicationDropDown(
    { selectedApplicationsIds, onChange },
    ref,
  ) {
    const classes = useStyles();
    const [applicationsList, setApplicationsList] = useState([]);
    const [autoCompleteText, setAutoCompleteText] = useState('');

    useEffect(() => {
      if (autoCompleteText) {
        getApplications({
          url: autoCompleteText,
          name: autoCompleteText,
        }).then(({ data }) => setApplicationsList(data.response));
      }
    }, [autoCompleteText]);

    return (
      <div className={classes.main}>
        <Autocomplete
          className={classes.wrapper}
          ref={ref}
          disableCloseOnSelect
          value={null}
          onChange={onChange}
          options={applicationsList}
          renderOption={option => (
            <>
              <Checkbox
                style={{ marginRight: 8 }}
                checked={selectedApplicationsIds.includes(option.id)}
              />
              {option.url}
            </>
          )}
          renderInput={params => {
            return (
              <TextField
                {...params}
                label="Search"
                placeholder="Search by name url"
                onChange={({ target }) => {
                  setAutoCompleteText(target.value);
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'disabled',
                  value: autoCompleteText,
                }}
                fullWidth
              />
            );
          }}
        />
      </div>
    );
  },
);

export default ApplicationsAutocompleteMultiSelect;
