import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CampaignFilter from './widgets/CampaignFilter';
import CampaignTableWrapper from './widgets/CampaignTableWrapper';
import { CampaignListAppProvider } from './services/CampaignListAppContext';

import 'typeface-roboto';

function CampaignListApp() {
  return (
    <Paper>
      <CampaignListAppProvider>
        <CardContent>
          <Typography variant='h5' component='h3' gutterBottom>
            CAMPAIGN LIST
          </Typography>
          <CampaignFilter />
        </CardContent>
        <CampaignTableWrapper />
      </CampaignListAppProvider>
    </Paper>
  );
}

export default CampaignListApp;
