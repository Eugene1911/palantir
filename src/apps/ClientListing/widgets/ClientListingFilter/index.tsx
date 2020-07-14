import React from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { inject, observer } from 'mobx-react';
import { LOAD_STATES } from 'config/constants';
import FilterLoader from 'sharedComponents/loaders/FilterLoader';
import { IClientListingFilterResourceStore } from './stores/ClientListingFilterResourceStore';
import { IClientListingFilterStore } from './stores/ClientListingFilterStore';

type ClientListingFilterProps = {
  filterResources?: IClientListingFilterResourceStore;
  filter?: IClientListingFilterStore;
};

const ClientListingFilter: React.FC<ClientListingFilterProps> = ({
  filterResources,
  filter,
}): JSX.Element => {
  const { t } = useTranslation();

  if (filterResources.state === LOAD_STATES.PENDING) {
    return <FilterLoader />;
  }

  return (
    <form onSubmit={filter.onSubmitFilterHandler}>
      <Grid
        justify="space-between"
        alignItems="flex-end"
        container
        spacing={2}
      >
        <Grid item xs={12} sm={6} md>
          <TextField
            fullWidth
            label={t('common:form.id')}
            name="id"
            value={filter.id}
            onChange={filter.onChangeClientFilterFielsHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6} md>
          <TextField
            fullWidth
            label={t('common:form.e_mail')}
            name="email"
            value={filter.email}
            onChange={filter.onChangeClientFilterFielsHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6} md>
          <TextField
            fullWidth
            label={t('client_listing:form.company_name')}
            name="company_name"
            value={filter.company_name}
            onChange={filter.onChangeClientFilterFielsHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6} md>
          <FormControl fullWidth>
            <InputLabel shrink htmlFor="fiscal_status">
              {t('client_listing:form.company_individual_status')}
            </InputLabel>

            <Select
              displayEmpty
              name="fiscal_status"
              onChange={filter.onChangeClientFilterFielsHandler}
              value={filter.fiscal_status}
            >
              <MenuItem value="">{t('common:form.all')}</MenuItem>
              {filterResources.resources.clientFiscalStatus.map(
                ({ name, value }: any) => (
                  <MenuItem key={value} value={value}>
                    {name}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md>
          <FormControl fullWidth>
            <InputLabel shrink htmlFor="status">
              {t('client_listing:form.status')}
            </InputLabel>

            <Select
              displayEmpty
              name="status"
              onChange={filter.onChangeClientFilterFielsHandler}
              value={filter.status}
            >
              <MenuItem value="">{t('common:form.all')}</MenuItem>
              {filterResources.resources.clientStatuses.map(
                ({ name, value }: any) => (
                  <MenuItem key={value} value={value}>
                    {name}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md>
          <FormControl fullWidth>
            <InputLabel shrink htmlFor="account_manager_id">
              {t('client_listing:form.activity')}
            </InputLabel>

            <Select
              displayEmpty
              name="is_retention"
              onChange={filter.onChangeClientFilterFielsHandler}
              value={filter.is_retention}
            >
              <MenuItem value="">{t('common:form.all')}</MenuItem>
              {filterResources.resources.retentionClientsFlag.map(
                ({ name, value }: any) => (
                  <MenuItem key={value} value={value.toString()}>
                    {name}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md>
          <FormControl fullWidth>
            <InputLabel shrink htmlFor="account_manager_id">
              {t('client_listing:form.managers')}
            </InputLabel>

            <Select
              displayEmpty
              name="account_manager_id"
              onChange={filter.onChangeClientFilterFielsHandler}
              value={filter.account_manager_id}
            >
              <MenuItem value="">{t('common:form.all')}</MenuItem>
              {filterResources.resources.managers.map(
                ({ email, id }: any) => (
                  <MenuItem key={id} value={id}>
                    {email}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md>
          <FormControl fullWidth>
            <InputLabel shrink htmlFor="traffic_source_type">
              {t('client_listing:form.user_type')}
            </InputLabel>

            <Select
              displayEmpty
              name="traffic_source_type"
              onChange={filter.onChangeClientFilterFielsHandler}
              value={filter.traffic_source_type}
            >
              <MenuItem value="">{t('common:form.all')}</MenuItem>
              {filterResources.resources.trafficSourceType.map(
                ({ value, name }: any) => (
                  <MenuItem key={value} value={value}>
                    {name}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl fullWidth>
            <InputLabel shrink htmlFor="role">
              {t('client_listing:form.role')}
            </InputLabel>

            <Select
              displayEmpty
              name="role"
              onChange={filter.onChangeClientFilterFielsHandler}
              value={filter.role}
            >
              <MenuItem value="">{t('common:form.all')}</MenuItem>
              {filterResources.resources.clientRols.map(
                ({ name, value }: any) => (
                  <MenuItem key={value} value={value}>
                    {name}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            {t('common:form.button_filter')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default inject(({ clientListingStore }) => ({
  filterResources: clientListingStore.filterResources,
  filter: clientListingStore.filter,
}))(observer(ClientListingFilter));
