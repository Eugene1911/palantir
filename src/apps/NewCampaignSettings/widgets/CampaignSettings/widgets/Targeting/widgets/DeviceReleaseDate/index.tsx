import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import QuestionTooltip from 'sharedComponents/QuestionTooltip';
import { TDeviceReleaseDateModel } from '../../stores/models/DeviceReleaseDate';
import { deviceReleaseDates } from '../../constants/deviceReleaseDates';

interface IDeviceReleaseDateProps {
  deviceReleaseDate?: TDeviceReleaseDateModel;
}

const DeviceReleaseDate = ({
  deviceReleaseDate,
}: IDeviceReleaseDateProps): JSX.Element => {
  return (
    <Grid container alignItems="center">
      <Grid xs={2} item>
        <FormControl fullWidth>
          <InputLabel>Months ago</InputLabel>
          <Select
            value={deviceReleaseDate.date}
            onChange={(event): void =>
              deviceReleaseDate.setDate(event.target.value as number)
            }
          >
            {deviceReleaseDates.map(date => (
              <MenuItem key={date.value} value={date.value}>
                {date.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <QuestionTooltip title="To target devices released within the last 6 months, choose '6 months'" />
    </Grid>
  );
};

export default inject(({ newCampaignSettings }) => ({
  deviceReleaseDate: newCampaignSettings.targeting.deviceReleaseDate,
}))(observer(DeviceReleaseDate));
