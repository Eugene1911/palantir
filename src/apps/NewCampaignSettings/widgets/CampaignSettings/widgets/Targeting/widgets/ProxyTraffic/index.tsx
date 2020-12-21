import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import CustomFormControlLabel from 'sharedComponents/CustomFormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { ProxyTrafficTypes } from 'sharedTypes';
import useStyles from './useStyles';
import { TProxyTrafficModel } from '../../stores/models/ProxyTraffic';

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
            <CustomFormControlLabel
              groupValue={proxyTraffic.proxyTrafficRadio}
              value={ProxyTrafficTypes.ALL}
              label="ALL"
              className={classes.radio}
            />
          </Grid>
          <Grid item>
            <CustomFormControlLabel
              groupValue={proxyTraffic.proxyTrafficRadio}
              value={ProxyTrafficTypes.NON_PROXY}
              label="NON-PROXY TRAFFIC ONLY"
              className={classes.radio}
            />
          </Grid>
          <Grid item>
            <CustomFormControlLabel
              groupValue={proxyTraffic.proxyTrafficRadio}
              value={ProxyTrafficTypes.PROXY}
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
