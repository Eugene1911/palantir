import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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
    flatRate,
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
          <Grid item xs={12} sm={6} md>
            <TextField
              fullWidth
              label="Campaign ID"
              name="campaignId"
              value={campaignFilterState.campaignId}
              onChange={onChangeCampaignFilterFielsHandler}
            />
          </Grid>
          <Grid item xs={12} sm={6} md>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              value={campaignFilterState.email}
              onChange={onChangeCampaignFilterFielsHandler}
            />
          </Grid>
          <Grid item xs={12} sm={6} md>
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
          <Grid zeroMinWidth item xs={12} sm={6} md>
            <FormControl fullWidth>
              <InputLabel shrink htmlFor="format_id">
                Ad Format
              </InputLabel>
              <Select
                multiple
                displayEmpty
                name="format_id"
                onChange={onChangeCampaignFilterFielsHandler}
                renderValue={selected => {
                  if (!selected.length) return 'All';

                  const formatList = formats
                    .filter(({ id }) => selected.includes(id))
                    .map(({ name }) => name)
                    .join(', ');

                  return <Typography noWrap>{formatList}</Typography>;
                }}
                value={campaignFilterState.format_id}
              >
                <MenuItem value={null}>All</MenuItem>
                {formats.map(({ name, id }) => (
                  <MenuItem key={id} value={id}>
                    <Checkbox
                      checked={
                        campaignFilterState.format_id.indexOf(id) > -1
                      }
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md>
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
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel shrink htmlFor="pricing_model">
                Flat rate
              </InputLabel>
              <Select
                displayEmpty
                name="flat_rate"
                onChange={onChangeCampaignFilterFielsHandler}
                value={campaignFilterState.flat_rate}
              >
                <MenuItem value="">All</MenuItem>
                {flatRate.map(({ name, value }) => (
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
    isFetching,
    onSubmitFilterHandler,
    campaignFilterState.campaignId,
    campaignFilterState.email,
    campaignFilterState.status,
    campaignFilterState.format_id,
    campaignFilterState.pricing_model,
    campaignFilterState.flat_rate,
    onChangeCampaignFilterFielsHandler,
    campaignStatuses,
    formats,
    pricingModel,
    flatRate,
  ]);
}

export default CampaignFilter;
