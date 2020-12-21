import React from 'react';
import { inject, observer } from 'mobx-react';
import { format } from 'date-fns';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import LockIcon from '@material-ui/icons/Lock';
import {
  DATE_DETAIL_FORMAT,
  DEFAULT_CAMPAIGN_NAME,
} from 'config/constants';
import { TCampaignFormHeaderStore } from './stores/CampaignFormHeaderStore';
import CampaignFormNotes from './widgets/CampaignFormNotes';
import useStyles from './useStyles';
import CampaignStatus from './components/CampaignStatus';

interface ICampaignFormHeaderProps {
  header?: TCampaignFormHeaderStore;
  name: string;
  status: string;
  campaignId?: number;
  created?: Date;
  updated?: Date;
  isBackup?: boolean;
  isExclusive?: boolean;
}

const CampaignFormHeader = ({
  header,
  name,
  status,
  campaignId,
  created,
  updated,
  isBackup,
  isExclusive,
}: ICampaignFormHeaderProps): JSX.Element => {
  const classes = useStyles();
  const formatCreated = created
    ? format(created, DATE_DETAIL_FORMAT)
    : null;
  const formatUpdated = updated
    ? format(updated, DATE_DETAIL_FORMAT)
    : null;

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
        direction="column"
        className={classes.nameContainer}
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
          {isBackup && (
            <Box className={classes.iconWrapper}>
              <CloudDownloadIcon color="primary" />
            </Box>
          )}
          {isExclusive && (
            <Box className={classes.iconWrapper}>
              <LockIcon color="primary" />
            </Box>
          )}
          <CampaignStatus status={status} />
        </Grid>
        {!!formatCreated && !!formatUpdated && (
          <Grid
            item
            container
            alignItems="center"
            className={classes.dateContainer}
          >
            <Typography className={classes.dateCreated}>
              Created:{' '}
            </Typography>
            <Typography className={classes.date}>
              {formatCreated}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography className={classes.dateUpdated}>
              Updated:
            </Typography>
            <Typography>{formatUpdated}</Typography>
          </Grid>
        )}
      </Grid>
      <Grid item>
        <CampaignFormNotes campaignId={campaignId} />
      </Grid>
    </Grid>
  );
};

export default inject(({ campaignFormHeader }) => ({
  header: campaignFormHeader,
}))(observer(CampaignFormHeader));
