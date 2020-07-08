import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TrafficTypeSelect from 'sharedComponents/TrafficTypeSelect';
import CategoriesSwitcherSelector from 'sharedWidgets/CategoriesSwitcherSelector';
import AdFormatSelect from 'sharedWidgets/AdFormatSelect';
import QuestionTooltip from 'sharedComponents/QuestionTooltip';

import useStyles from './useStyles';

function CampaignEditCommon(): JSX.Element {
  const [listOfCategories, setCategories] = useState([
    40,
    30,
    23,
    34,
  ]);
  const classes = useStyles({});
  const [trafficTypeSelectValue, setTrafficTypeSelect] = useState(0);

  return (
    <>
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>Name</Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="name"
            label="Name"
            fullWidth
            value="Company name test"
            multiline
            onChange={(event: any) =>
              console.log(
                'partner_networks_cpmv - >',
                event.target.value,
              )
            }
          />
        </Grid>
      </Grid>
      <br />
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>
            Traffic Type
            <QuestionTooltip title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TrafficTypeSelect
            onChange={(value): void => setTrafficTypeSelect(value)}
            value={trafficTypeSelectValue}
          />
        </Grid>
      </Grid>
      <br />
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>Categories</Typography>
        </Grid>
        <Grid item xs={8}>
          <CategoriesSwitcherSelector
            value={listOfCategories}
            onChange={(values): void => setCategories(values)}
          />
        </Grid>
      </Grid>
      <br />
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>Ad Format</Typography>
        </Grid>
        <Grid item wrap="nowrap" xs={8} container spacing={2}>
          <Grid item xs={4}>
            <AdFormatSelect
              onChange={(event): void => console.log('1')}
              value={4}
            />
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>Type</Typography>
        </Grid>
        <Grid item wrap="nowrap" xs={8} container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel shrink htmlFor="ad_type">
                Ad type
              </InputLabel>

              <Select
                displayEmpty
                name="ad_format"
                onChange={() => console.log('ds')}
                value=""
              >
                <MenuItem value="">All</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default CampaignEditCommon;
