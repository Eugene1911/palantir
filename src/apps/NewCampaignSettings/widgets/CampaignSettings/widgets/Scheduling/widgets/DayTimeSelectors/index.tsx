import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { AllCustomStatus } from 'sharedTypes';
import { TSchedulingModel } from '../../stores/SchedulingStore';
import {
  DAY,
  FULL,
  NIGHT,
  WORKING,
} from '../../constants/dayTimeRanges';

import useStyles from './useStyles';
import DayTimeTable from '../DayTimeTable';

interface IDayTimeSelectorsProps {
  scheduling?: TSchedulingModel;
}

const DayTimeSelectors = ({
  scheduling,
}: IDayTimeSelectorsProps): JSX.Element => {
  const classes = useStyles();

  const handleClickButton = (
    hours: string,
    status: AllCustomStatus,
  ): void => {
    scheduling.setDayTimeRange(hours, status);
  };

  return (
    <>
      <Grid container className={classes.container}>
        <Button
          onClick={(): void =>
            handleClickButton(FULL, AllCustomStatus.ALL)
          }
          className={classes.button}
          color="primary"
        >
          All
        </Button>
        <Button
          onClick={(): void =>
            handleClickButton(WORKING, AllCustomStatus.CUSTOM)
          }
          className={classes.button}
          color="primary"
        >
          Working hours
        </Button>
        <Button
          onClick={(): void =>
            handleClickButton(DAY, AllCustomStatus.CUSTOM)
          }
          className={classes.button}
          color="primary"
        >
          Day time
        </Button>
        <Button
          onClick={(): void =>
            handleClickButton(NIGHT, AllCustomStatus.CUSTOM)
          }
          className={classes.button}
          color="primary"
        >
          Night time
        </Button>
      </Grid>

      <Grid wrap="nowrap" container className={classes.container}>
        <DayTimeTable />
      </Grid>
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  scheduling: newCampaignSettings.scheduling,
}))(observer(DayTimeSelectors));
