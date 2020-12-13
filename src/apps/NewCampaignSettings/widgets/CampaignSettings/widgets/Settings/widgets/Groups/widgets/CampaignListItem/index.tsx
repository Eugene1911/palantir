import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { TCampaignModel } from '../../../../stores/models/Groups';
import useStyles from './useStyles';

interface ICampaignListItemProps {
  campaign: TCampaignModel;
}

const CampaignListItem = ({
  campaign,
}: ICampaignListItemProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Grid
        container
        wrap="nowrap"
        justify="space-between"
        alignItems="center"
        className={classes.string}
      >
        <Typography className={classes.name}>
          {campaign.name}
        </Typography>
        <Typography className={classes.subName}>
          {campaign.id}
        </Typography>
      </Grid>
      <Grid container wrap="nowrap" alignItems="center">
        <Typography className={classes.status}>
          {campaign.status}
        </Typography>
        <Typography className={classes.type}>
          {campaign.formatName || campaign.type}
        </Typography>
      </Grid>
    </Box>
  );
};

export default CampaignListItem;
