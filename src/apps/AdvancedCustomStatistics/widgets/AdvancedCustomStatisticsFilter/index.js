import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DateRangePickerDropDown from 'sharedComponents/DateRangePickerDropDown';
import ApplicationsMultiSelect from 'sharedWidgets/ApplicationsMultiSelect';
import AutocompleteMultiSelect from 'sharedWidgets/AutocompleteMultiSelect';
import SpotsAutocompleteMultiSelect from 'sharedWidgets/SpotsAutocompleteMultiSelect';
import CountriesMultiSelect from 'sharedWidgets/CountriesMultiSelect';
import { getFormats } from 'resources/api';

function AdvancedCustomStatisticsFilter({ filterForm }) {
  return (
    <form onSubmit={filterForm.onSubmitFilterFormHandler}>
      <Grid
        justify="space-between"
        alignItems="flex-end"
        container
        spacing={2}
      >
        <Grid item xs={12} sm={6} md>
          <DateRangePickerDropDown
            startDate={filterForm.date_from}
            endDate={filterForm.date_to}
            onChange={filterForm.onChangeDateHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6} md>
          <ApplicationsMultiSelect
            applicationsIds={filterForm.app_id}
            onChange={filterForm.onChangeApplicationsHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6} md>
          <SpotsAutocompleteMultiSelect
            label="spots"
            applicationsIds={filterForm.app_id}
            onChange={(event, value) => {
              console.log(
                'SpotsAutocompleteMultiSelect - onChange',
                value,
              );
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md>
          <CountriesMultiSelect
            selectedCountries={filterForm.countries}
            onChange={filterForm.onChangeHandlerCountries}
          />
        </Grid>
        <Grid item xs={12} sm={6} md>
          <AutocompleteMultiSelect
            label="format"
            onChange={(event, value) => {
              console.log(
                'AutocompleteMultiSelect - onChange',
                value,
              );
            }}
            functionRequestData={getFormats}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Show
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

AdvancedCustomStatisticsFilter.propTypes = {
  filterForm: PropTypes.shape({
    app_id: PropTypes.arrayOf(PropTypes.number),
    countries: PropTypes.arrayOf(PropTypes.string),
    date_from: PropTypes.instanceOf(Date),
    date_to: PropTypes.instanceOf(Date),
    onChangeApplicationsHandler: PropTypes.func,
    onChangeDateHandler: PropTypes.func,
    onChangeHandlerCountries: PropTypes.func,
    onSubmitFilterFormHandler: PropTypes.func,
  }).isRequired,
};

export default inject(({ advancedCustomStatisticsStore }) => ({
  filterForm: advancedCustomStatisticsStore.filter,
}))(AdvancedCustomStatisticsFilter);
