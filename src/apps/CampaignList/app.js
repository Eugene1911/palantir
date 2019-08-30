import 'typeface-roboto';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { SnackbarProvider } from 'notistack';
import { MAX_COUNT_SNACK } from 'config/constants';
import { Provider } from 'mobx-react';
import { RejectReasonsStore } from 'stors/RejectReasonsStore';
import CampaignFilter from './widgets/CampaignFilter';
import CampaignTableWrapper from './widgets/CampaignTableWrapper';
import { CampaignListAppProvider } from './services/CampaignListAppContext';

const store = {
  rejectReasonsStore: RejectReasonsStore.create(),
};

function CampaignListApp() {
  return (
    <Provider {...store}>
      <Paper>
        <SnackbarProvider maxSnack={MAX_COUNT_SNACK}>
          <CampaignListAppProvider>
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom>
                CAMPAIGN LIST
              </Typography>
              <CampaignFilter />
            </CardContent>
            <CampaignTableWrapper />
          </CampaignListAppProvider>
        </SnackbarProvider>
      </Paper>
    </Provider>
  );
}

export default CampaignListApp;
