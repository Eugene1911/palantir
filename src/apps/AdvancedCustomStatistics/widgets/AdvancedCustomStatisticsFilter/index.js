import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DateRangePickerDropDown from 'sharedComponents/DateRangePickerDropDown';
import ApplicationsMultiSelect from 'sharedWidgets/ApplicationsMultiSelect';
import CountriesMultiSelect from 'sharedWidgets/CountriesMultiSelect';
import dateFnsFormat from 'helpers/dateFnsFormat';
import { subMonths, format } from 'date-fns';
import { CURRENCY_EXCHANGE_DATE_FORMAT } from 'config/constants';

const LAST_MOUNTH = subMonths(new Date(), 2);
const TODAY = new Date();
const LAST_MOUNTH_FORMAT = format(
  LAST_MOUNTH,
  CURRENCY_EXCHANGE_DATE_FORMAT,
);
const TODAY_FORMAT = format(TODAY, CURRENCY_EXCHANGE_DATE_FORMAT);

function AdvancedCustomStatisticsFilter({
  advancedCustomStatisticsStore,
}) {
  const { getStats } = advancedCustomStatisticsStore;
  const [filterDate, setFilterDate] = useState({
    startDate: LAST_MOUNTH,
    endDate: TODAY,
  });
  const onSubmitFilterHandler = event => {
    event.preventDefault();

    getStats({
      date_from: dateFnsFormat(
        filterDate.startDate,
        CURRENCY_EXCHANGE_DATE_FORMAT,
      ),
      date_to: dateFnsFormat(
        filterDate.endDate,
        CURRENCY_EXCHANGE_DATE_FORMAT,
      ),
    });
  };

  useEffect(() => {
    getStats({
      date_from: LAST_MOUNTH_FORMAT,
      date_to: TODAY_FORMAT,
    });
  }, [getStats]);

  return (
    <form onSubmit={onSubmitFilterHandler}>
      <Grid
        justify="space-between"
        alignItems="flex-end"
        container
        spacing={2}
      >
        <Grid item xs={12} sm={6} md>
          <DateRangePickerDropDown
            {...{ ...filterDate }}
            onChange={setFilterDate}
          />
        </Grid>
        <Grid item xs={12} sm={6} md>
          <ApplicationsMultiSelect />
        </Grid>
        <Grid item xs={12} sm={6} md>
          <CountriesMultiSelect />
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

export default inject('advancedCustomStatisticsStore')(
  observer(AdvancedCustomStatisticsFilter),
);
