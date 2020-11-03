import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import useStyles from './useStyles';
import { TProxyTrafficModel } from '../../stores/models/ProxyTraffic';
import { ProxyTrafficTypes } from '../../constants/proxyTrafficTypes';

interface IProxyTrafficProps {
  proxyTraffic?: TProxyTrafficModel;
}

const ProxyTraffic = ({
  proxyTraffic,
}: IProxyTrafficProps): JSX.Element => {
  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      <RadioGroup
        name="proxyTraffic"
        value={proxyTraffic.proxyTrafficRadio}
        onChange={(evt): void =>
          proxyTraffic.setProxyTrafficRadio(
            evt.target.value as ProxyTrafficTypes,
          )
        }
      >
        <Grid container>
          <Grid item>
            <FormControlLabel
              value={ProxyTrafficTypes.ALL}
              control={<Radio color="primary" />}
              label="ALL"
              className={classes.radio}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              value={ProxyTrafficTypes.NON_PROXY}
              control={<Radio color="primary" />}
              label="NON-PROXY TRAFFIC ONLY"
              className={classes.radio}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              value={ProxyTrafficTypes.PROXY}
              control={<Radio color="primary" />}
              label="PROXY TRAFFIC ONLY"
            />
          </Grid>
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

export default inject(({ newCampaignSettings }) => ({
  proxyTraffic: newCampaignSettings.targeting.proxyTraffic,
}))(observer(ProxyTraffic));
