import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TSettingsModel } from '../../../../stores/SettingsStore';
import useStyles from './useStyles';

interface IAddToBlackListPanelProps {
  settings?: TSettingsModel;
}

const AddToBlackListPanel = ({
  settings,
}: IAddToBlackListPanelProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Grid
        className={classes.container}
        container
        justify="space-between"
        alignItems="center"
        wrap="nowrap"
      >
        <Grid item>
          <Typography component="span">
            Select the tags on top you want to add to the Blacklist.
            Added tags will be highlighted in red.
          </Typography>
          <Typography component="span">
            {' '}
            {settings.tempBlackListTags.length} selected
          </Typography>
        </Grid>
        <Grid item container className={classes.buttons}>
          <Button
            onClick={(): void => settings.toggleAddMode()}
            className={classes.cancel}
          >
            Cancel
          </Button>
          <Button
            onClick={(): void => settings.toggleAddMode(true)}
            variant="contained"
            color="primary"
          >
            Done
          </Button>
        </Grid>
      </Grid>
      <Box className={classes.fakeContainer} />
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  settings: newCampaignSettings.settings,
}))(observer(AddToBlackListPanel));
