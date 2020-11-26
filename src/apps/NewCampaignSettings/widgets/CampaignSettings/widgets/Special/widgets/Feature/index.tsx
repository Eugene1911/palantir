import React, { ChangeEvent } from 'react';
import { inject, observer } from 'mobx-react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { TSpecialModel } from '../../stores/SpecialStore';

import useStyles from './useStyles';

interface IFeatureProps {
  special?: TSpecialModel;
  canSetupAnyPrice?: boolean;
  isAdvertiserAccountManager?: boolean;
  isPerformanceManager?: boolean;
}

const Feature = ({
  special,
  canSetupAnyPrice,
  isAdvertiserAccountManager,
  isPerformanceManager,
}: IFeatureProps): JSX.Element => {
  const classes = useStyles();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    special.setFeature({
      ...special.feature,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormGroup row>
      {isAdvertiserAccountManager && (
        <FormControlLabel
          control={
            <Switch
              checked={special.feature.exclusive}
              onChange={handleChange}
              name="exclusive"
              color="primary"
            />
          }
          label="EXCLUSIVE"
          className={classes.switch}
        />
      )}
      {canSetupAnyPrice && (
        <FormControlLabel
          control={
            <Switch
              checked={special.feature.setAnyPrice}
              onChange={handleChange}
              name="setAnyPrice"
              color="primary"
            />
          }
          label="SET ANY PRICE"
          className={classes.switch}
        />
      )}
      {isPerformanceManager && (
        <FormControlLabel
          control={
            <Switch
              checked={special.feature.backup}
              onChange={handleChange}
              name="backup"
              color="primary"
            />
          }
          label="BACKUP"
        />
      )}
    </FormGroup>
  );
};

export default inject(({ newCampaignSettings }) => ({
  special: newCampaignSettings.special,
  canSetupAnyPrice: newCampaignSettings.permissions.canSetupAnyPrice,
  isAdvertiserAccountManager:
    newCampaignSettings.permissions.isAdvertiserAccountManager,
  isPerformanceManager:
    newCampaignSettings.permissions.isPerformanceManager,
}))(observer(Feature));
