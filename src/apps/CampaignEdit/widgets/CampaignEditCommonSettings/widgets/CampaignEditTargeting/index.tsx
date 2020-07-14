import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DeviceMultiSelect from 'sharedWidgets/DeviceMultiSelect';
import OSMultiSelect from 'sharedWidgets/OSMultiSelect';
import BrowserMultiSelect from 'sharedWidgets/BrowserMultiSelect';
import LanguagesMultiSelect from 'sharedWidgets/LanguagesMultiSelect';
import KeywordsChips from 'sharedWidgets/KeywordsChips';
import IncludeExcludeSwitchList from 'sharedWidgets/IncludeExcludeSwitchList';
import useStyles from './useStyles';

function CampaignEditTargeting(): JSX.Element {
  const classes = useStyles({});
  const [keywords, setKeywords] = useState([]);
  const [ipRangeValue, setIpRange] = useState([]);

  return (
    <>
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>Locations</Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="locations"
              name="locations"
              value={0}
              onChange={() => console.log('locations')}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="All countries and territories"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Choose specific location"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <br />
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>Languages</Typography>
        </Grid>
        <Grid item xs={4}>
          <LanguagesMultiSelect
            onChange={value =>
              console.log('LanguagesMultiSelect ->', value)
            }
            value={[0, 45]}
          />
        </Grid>
      </Grid>
      <br />
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>Devices</Typography>
        </Grid>
        <Grid item xs={4}>
          <DeviceMultiSelect
            onChange={() => console.log('')}
            value={[0, 45]}
          />
        </Grid>
      </Grid>
      <br />
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>Operation Systems</Typography>
        </Grid>
        <Grid item xs={4}>
          <OSMultiSelect
            onChange={() => console.log('')}
            value={[0, 45]}
          />
        </Grid>
      </Grid>
      <br />
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>Browsers</Typography>
        </Grid>
        <Grid item xs={4}>
          <BrowserMultiSelect
            onChange={() => console.log('')}
            value={[13, 11, 5, 45]}
          />
        </Grid>
      </Grid>
      <br />
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>Keywords</Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={!0}
                onChange={() => console.log('ip_range')}
                name="use_keywords"
              />
            }
            label="Use keywords"
          />
          <div>
            <KeywordsChips
              value={keywords}
              onChange={value => setKeywords(value)}
            />
          </div>
        </Grid>
      </Grid>
      <br />
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>IP ranges</Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!0}
                onChange={() => console.log('ip_range')}
                name="ip_range"
              />
            }
            label="Use IP lists"
          />
          <IncludeExcludeSwitchList
            value={ipRangeValue}
            onChange={value => setIpRange(value)}
          />
        </Grid>
      </Grid>
      <br />
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>Partner Networks Traffic</Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={!0}
                onChange={() =>
                  console.log('partner_networks_traffic')
                }
                name="partner_networks_traffic"
              />
            }
            label="Allowed"
          />
        </Grid>
      </Grid>
      <br />
      <Grid alignItems="flex-start" container>
        <Grid className={classes.leftIndent} item xs={1} />
        <Grid item xs={3}>
          <Typography>Partner Network CPMV</Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <Input
              id="partner_networks_cpmv"
              value={1}
              rows="3"
              style={{ width: '104px' }}
              type="number"
              inputProps={{
                step: 0.1,
                className: 'global-text-align-right',
              }}
              onChange={event =>
                console.log(
                  'partner_networks_cpmv - >',
                  event.target.value,
                )
              }
            />
            <FormHelperText>
              top CPMV: 0.00001 USD, minimum bid: 0.01 USD
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

export default CampaignEditTargeting;
