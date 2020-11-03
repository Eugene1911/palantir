import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import { TTargetingModel } from '../../stores/TargetingStore';

import useStyles from './useStyles';

interface IOpenAdvancedTabsButtonProps {
  targeting?: TTargetingModel;
}

const OpenAdvancedTabsButton = ({
  targeting,
}: IOpenAdvancedTabsButtonProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Button
        className={classes.button}
        onClick={targeting.toggleIsAdvancedOpen}
        endIcon={
          targeting.isAdvancedOpen ? (
            <ArrowDropUp />
          ) : (
            <ArrowDropDown />
          )
        }
      >
        Advanced
      </Button>
    </Grid>
  );
};

export default inject(({ newCampaignSettings }) => ({
  targeting: newCampaignSettings.targeting,
}))(observer(OpenAdvancedTabsButton));
