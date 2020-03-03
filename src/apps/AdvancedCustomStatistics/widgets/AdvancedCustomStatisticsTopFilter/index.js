import React from 'react';
import { inject } from 'mobx-react';
import DateRangePickerDropDown from 'sharedComponents/DateRangePickerDropDown';
import Grid from '@material-ui/core/Grid';

function AdvancedCustomStatisticsTopFilter({
  filterForm,
  filterSideStore,
}) {
  return (
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
        <button
          onClick={filterSideStore.onToggleFilterHandler}
          type="button"
        >
          Toggle filter
        </button>
      </Grid>
    </Grid>
  );
}

export default inject(
  ({ advancedCustomStatisticsStore, filterSideStore }) => ({
    filterForm: advancedCustomStatisticsStore.filter,
    filterSideStore,
  }),
)(AdvancedCustomStatisticsTopFilter);
