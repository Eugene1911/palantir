import React, { ChangeEvent } from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { TSchedulingModel } from '../../stores/SchedulingStore';
import DayTimeSelectors from '../DayTimeSelectors';
import {
  dayTimeRangesByStatus,
  DayTimeRangeStatuses,
} from '../../constants/dayTimeRanges';

import useStyles from './useStyles';

interface IDayTimeRangeProps {
  scheduling?: TSchedulingModel;
}

const DayTimeRange = ({
  scheduling,
}: IDayTimeRangeProps): JSX.Element => {
  const classes = useStyles();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const status: DayTimeRangeStatuses = event.target
      .value as DayTimeRangeStatuses;
    scheduling.setDayTimeRange(dayTimeRangesByStatus[status], status);
  };

  return (
    <>
      <FormControl component="fieldset">
        <RadioGroup
          name="dayTimeRange"
          value={scheduling.dayTimeRangeStatus}
          onChange={handleChange}
        >
          <Grid container>
            <Grid item>
              <FormControlLabel
                value={DayTimeRangeStatuses.ALL}
                control={<Radio />}
                label="ALL"
                className={classes.radio}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                value={DayTimeRangeStatuses.CUSTOM}
                control={<Radio />}
                label="CUSTOM"
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>

      {scheduling.dayTimeRangeStatus ===
        DayTimeRangeStatuses.CUSTOM && <DayTimeSelectors />}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  scheduling: newCampaignSettings.scheduling,
}))(observer(DayTimeRange));
