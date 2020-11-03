import React from 'react';
import { inject, observer } from 'mobx-react';

import { AllCustomStatus } from 'sharedTypes';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { TDevicesModel } from '../../stores/models/Devices';
import AllCustomRadio from '../../../../components/AllCustomRadio';
import useStyles from './useStyles';
import { deviceTypes } from './constants/deviceTypes';

interface IDevicesProps {
  devices?: TDevicesModel;
}

const Devices = ({ devices }: IDevicesProps): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <AllCustomRadio
        onChange={devices.setDevicesRadio}
        value={devices.devicesRadio}
        name="devices"
      />

      {devices.devicesRadio === AllCustomStatus.CUSTOM && (
        <Grid container>
          <FormControl
            component="fieldset"
            className={classes.formControl}
          >
            <FormGroup row>
              {deviceTypes.map((type, index) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!devices.devicesTypes[index]}
                      onChange={(evt): void =>
                        devices.toggleDeviceType(
                          index,
                          evt.target.checked,
                        )
                      }
                      name={type}
                      disabled={
                        !!devices.devicesTypes[index] &&
                        devices.isNeedDisable
                      }
                    />
                  }
                  label={type}
                  key={type}
                  className={classes.checkbox}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  devices: newCampaignSettings.targeting.devices,
}))(observer(Devices));
