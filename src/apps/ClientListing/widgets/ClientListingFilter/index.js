import React from 'react';
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
import useClientListingFilter from './services/useClientListingFilter';

const ClientListingFilter = inject('clientListingStore')(
  observer(({ clientListingStore }) => {
    const {
      filterStore,
      clientFilterState,
      onSubmitFilterHandler,
      onChangeClientFilterFielsHandler,
    } = useClientListingFilter(clientListingStore);

    if (filterStore.state === LOAD_STATES.PENDING) {
      return <FilterLoader />;
    }

    return (
      <form onSubmit={onSubmitFilterHandler}>
        <Grid
          justify="space-between"
          alignItems="flex-end"
          container
          spacing={2}
        >
          <Grid item xs={12} sm={6} md>
            <TextField
              fullWidth
              label="ID"
              name="id"
              value={clientFilterState.id}
              onChange={onChangeClientFilterFielsHandler}
            />
          </Grid>
          <Grid item xs={12} sm={6} md>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              value={clientFilterState.email}
              onChange={onChangeClientFilterFielsHandler}
            />
          </Grid>
          <Grid item xs={12} sm={6} md>
            <TextField
              fullWidth
              label="Company name"
              name="company_name"
              value={clientFilterState.company_name}
              onChange={onChangeClientFilterFielsHandler}
            />
          </Grid>
          <Grid item xs={12} sm={6} md>
            <FormControl fullWidth>
              <InputLabel shrink htmlFor="fiscal_status">
                Company / Individual status
              </InputLabel>

              <Select
                displayEmpty
                name="fiscal_status"
                onChange={onChangeClientFilterFielsHandler}
                value={clientFilterState.fiscal_status}
              >
                <MenuItem value="">All</MenuItem>
                {filterStore.resources.clientFiscalStatus.map(
                  ({ name, value }) => (
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
                Status
              </InputLabel>

              <Select
                displayEmpty
                name="status"
                onChange={onChangeClientFilterFielsHandler}
                value={clientFilterState.status}
              >
                <MenuItem value="">All</MenuItem>
                {filterStore.resources.clientStatuses.map(
                  ({ name, value }) => (
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
                Managers
              </InputLabel>

              <Select
                displayEmpty
                name="account_manager_id"
                onChange={onChangeClientFilterFielsHandler}
                value={clientFilterState.account_manager_id}
              >
                <MenuItem value="">All</MenuItem>
                {filterStore.resources.managers.map(
                  ({ email, id }) => (
                    <MenuItem key={id} value={id}>
                      {email}
                    </MenuItem>
                  ),
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel shrink htmlFor="role">
                Role
              </InputLabel>

              <Select
                displayEmpty
                name="role"
                onChange={onChangeClientFilterFielsHandler}
                value={clientFilterState.role}
              >
                <MenuItem value="">All</MenuItem>
                {filterStore.resources.clientRols.map(
                  ({ name, value }) => (
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
              Filter
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }),
);

export default ClientListingFilter;
