import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import QuestionTooltip from 'sharedComponents/QuestionTooltip';
import { TSchedulingModel } from '../../stores/SchedulingStore';
import { timezones } from '../../constants/timezones';

import useStyles from './useStyles';

interface IStartEndDateProps {
  scheduling?: TSchedulingModel;
}

const StartEndDate = ({
  scheduling,
}: IStartEndDateProps): JSX.Element => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid alignItems="center" container>
        <Grid
          alignItems="flex-end"
          wrap="nowrap"
          xs={5}
          item
          container
          classes={{ root: classes.input }}
        >
          <FormControl fullWidth>
            <InputLabel>Time zone</InputLabel>
            <Select
              value={scheduling.timezone}
              onChange={(event): void =>
                scheduling.setTimezone(event.target.value as number)
              }
            >
              {timezones.map(timezone => (
                <MenuItem key={timezone.value} value={timezone.value}>
                  {timezone.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <QuestionTooltip title="This allows you to choose in which time zone to show your ads." />
        </Grid>
        <Grid item xs={2} classes={{ root: classes.input }}>
          <KeyboardDatePicker
            label="Start date"
            format="MM/dd/yyyy"
            value={scheduling.dateStart || null}
            onChange={(date): void =>
              scheduling.setDate(date, 'dateStart')
            }
          />
        </Grid>
        <Grid item xs={2}>
          <KeyboardDatePicker
            label="Start end"
            format="MM/dd/yyyy"
            value={scheduling.dateEnd || null}
            onChange={(date): void =>
              scheduling.setDate(date, 'dateEnd')
            }
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default inject(({ newCampaignSettings }) => ({
  scheduling: newCampaignSettings.scheduling,
}))(observer(StartEndDate));
