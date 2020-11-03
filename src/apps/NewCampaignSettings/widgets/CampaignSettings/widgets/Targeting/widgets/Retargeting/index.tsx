import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import { TTargetingModel } from '../../stores/TargetingStore';

import useStyles from './useStyles';

interface IRetargetingProps {
  targeting?: TTargetingModel;
}

const Retargeting = ({
  targeting,
}: IRetargetingProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <ErrorIcon className={classes.icon} />
      </Grid>
      <Grid item>
        <Typography className={classes.text}>
          When the campaign will be created, you will be able to
          generate a retargeting pixel on the edit page.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default inject(({ newCampaignSettings }) => ({
  targeting: newCampaignSettings.targeting,
}))(observer(Retargeting));
