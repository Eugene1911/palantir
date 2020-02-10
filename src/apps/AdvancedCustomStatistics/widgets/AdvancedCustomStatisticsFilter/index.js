import React from 'react';
import { inject, observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import ApplicationsMultiSelect from 'sharedWidgets/ApplicationsMultiSelect';
import SpotsAutocompleteMultiSelect from 'sharedWidgets/SpotsAutocompleteMultiSelect';
import CountriesMultiSelect from 'sharedWidgets/CountriesMultiSelect';
import FormatMultiSelect from 'sharedWidgets/FormatMultiSelect';
import DeviceMultiSelect from 'sharedWidgets/DeviceMultiSelect';
import OSMultiSelect from 'sharedWidgets/OSMultiSelect';
import BrowserMultiSelect from 'sharedWidgets/BrowserMultiSelect';
import FilterSide from 'sharedWidgets/FilterSide';

function AdvancedCustomStatisticsFilter({ filterForm }) {
  return (
    <FilterSide>
      <form onSubmit={filterForm.onSubmitFilterFormHandler}>
        <ApplicationsMultiSelect
          applicationsIds={filterForm.app_id}
          onChange={filterForm.onChangeApplicationsHandler}
        />
        <br />
        <br />
        <SpotsAutocompleteMultiSelect
          label="Spots"
          spotsIds={filterForm.spot_id}
          applicationsIds={filterForm.app_id}
          onChange={filterForm.onChangeSpotsHandler}
        />
        <br />
        <CountriesMultiSelect
          selectedCountries={filterForm.countries}
          onChange={filterForm.onChangeHandlerCountries}
        />
        <br />
        <br />
        <FormatMultiSelect
          value={filterForm.format_id}
          onChange={filterForm.onChangeHandlerFormat}
        />
        <br />
        <DeviceMultiSelect
          value={filterForm.device_id}
          onChange={filterForm.onChangeDeviceHandler}
        />
        <br />
        <OSMultiSelect
          value={[]}
          onChange={() => {
            console.log('s');
          }}
        />
        <br />
        <BrowserMultiSelect
          value={[]}
          onChange={() => {
            console.log('s');
          }}
        />
        <br />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Show
        </Button>
      </form>
    </FilterSide>
  );
}

export default inject(({ advancedCustomStatisticsStore }) => ({
  filterForm: advancedCustomStatisticsStore.filter,
}))(observer(AdvancedCustomStatisticsFilter));
