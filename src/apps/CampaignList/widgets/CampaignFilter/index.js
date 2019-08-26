import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FilterLoader from 'sharedComponents/loaders/FilterLoader';
import useCampaignFilterResourceReducer from './services/campaignFilterResourcsReducer/useCampaignFilterResourceReducer';
import useCampaignFilterState from './services/campaignFilterState';

function CampaignFilter() {
  const {
    isFetching,
    formats,
    pricingModel,
    campaignStatuses,
  } = useCampaignFilterResourceReducer();
  const {
    campaignFilterState,
    onSubmitFilterHandler,
    onChangeCampaignFilterFielsHandler,
  } = useCampaignFilterState();

  return useMemo(() => {
    if (isFetching) {
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
          <Grid item xs>
            <TextField
              fullWidth
              label="Campaign ID"
              name="campaignId"
              value={campaignFilterState.campaignId}
              onChange={onChangeCampaignFilterFielsHandler}
            />
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel shrink htmlFor="status">
                Campaign status
              </InputLabel>

              <Select
                displayEmpty
                name="status"
                onChange={onChangeCampaignFilterFielsHandler}
                value={campaignFilterState.status}
              >
                <MenuItem value="">All</MenuItem>
                {campaignStatuses.map(({ name, value }) => (
                  <MenuItem key={value} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel shrink htmlFor="format_id">
                Ad Format
              </InputLabel>
              <Select
                displayEmpty
                name="format_id"
                onChange={onChangeCampaignFilterFielsHandler}
                value={campaignFilterState.format_id}
              >
                <MenuItem value="">All</MenuItem>
                {formats.map(({ name, id }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel shrink htmlFor="pricing_model">
                Pricing model
              </InputLabel>
              <Select
                displayEmpty
                name="pricing_model"
                onChange={onChangeCampaignFilterFielsHandler}
                value={campaignFilterState.pricing_model}
              >
                <MenuItem value="">All</MenuItem>
                {pricingModel.map(({ name, value }) => (
                  <MenuItem key={value} value={value}>
                    {name}
                  </MenuItem>
                ))}
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
  }, [
    onChangeCampaignFilterFielsHandler,
    campaignFilterState,
    pricingModel,
    onSubmitFilterHandler,
    isFetching,
    campaignStatuses,
    formats,
  ]);
}

export default CampaignFilter;
