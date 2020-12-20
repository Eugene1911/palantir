import React from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import cn from 'classnames';
import useStyles from './useStyles';

interface ICampaignStatusProps {
  status: string;
}

const CampaignStatus = ({
  status,
}: ICampaignStatusProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={cn(classes.wrapper, classes[status])}>
      <Typography className={classes.status}>{status}</Typography>
    </Box>
  );
};

export default CampaignStatus;
