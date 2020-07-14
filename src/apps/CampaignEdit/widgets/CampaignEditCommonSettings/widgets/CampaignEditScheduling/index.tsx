import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import useStyles from './useStyles';

function CampaignEditScheduling(): JSX.Element {
  const classes = useStyles({});
  const filter = {
    utc: 'utc',
    date1: 1,
  };

  return (
    <>
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <div className="global-label-topindent-form-row">
            <Typography>Select period</Typography>
          </div>
        </Grid>
        <Grid
          item
          wrap="nowrap"
          xs={8}
          justify="space-between"
          container
          spacing={2}
        >
          <Grid item xs={2}>
            <FormControl fullWidth>
              <Select
                displayEmpty
                name="utc1"
                onChange={() => console.log('onChange')}
                value={filter.utc}
              >
                <MenuItem value="utc">UTC + 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <Select
                displayEmpty
                name="utc2"
                onChange={() => console.log('onChange')}
                value={filter.date1}
              >
                <MenuItem value="1">23.04.2020</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <Select
                displayEmpty
                name="date1"
                onChange={() => console.log('onChange')}
                value={filter.date1}
              >
                <MenuItem value="1">23.04.2020</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Button color="primary">SET SCHEDULE</Button>
          </Grid>
        </Grid>
      </Grid>
      <br />
    </>
  );
}

export default CampaignEditScheduling;
