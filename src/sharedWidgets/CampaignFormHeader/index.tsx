import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DEFAULT_CAMPAIGN_NAME } from 'config/constants';
import { TCampaignFormHeaderStore } from './stores/CampaignFormHeaderStore';
import Notes from './widgets/Notes';
import useStyles from './useStyles';

interface ICampaignFormHeaderProps {
  header?: TCampaignFormHeaderStore;
  name: string;
  status: string;
  campaignId?: number;
}

const CampaignFormHeader = ({
  header,
  name,
  status,
  campaignId,
}: ICampaignFormHeaderProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid
      justify="space-between"
      alignItems="center"
      container
      className={classes.container}
    >
      <Grid
        item
        container
        alignItems="center"
        className={classes.nameContainer}
      >
        <Typography className={classes.name}>
          {name || DEFAULT_CAMPAIGN_NAME}
        </Typography>
        <Typography>{status}</Typography>
      </Grid>
      <Grid item>
        <Notes campaignId={campaignId} />
      </Grid>
    </Grid>
  );
};

export default inject(({ campaignFormHeader }) => ({
  header: campaignFormHeader,
}))(observer(CampaignFormHeader));
