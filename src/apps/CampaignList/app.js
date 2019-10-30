import 'config/i18n';
import 'typeface-roboto';
import React, { Suspense } from 'react';
import Paper from '@material-ui/core/Paper';
import { SnackbarProvider } from 'notistack';
import { MAX_COUNT_SNACK } from 'config/constants';
import { Provider } from 'mobx-react';
import { RejectReasonsStore } from 'stors/RejectReasonsStore';
import globalStyles from 'themes/global.styles';
import SuspenseFallbackMain from 'sharedComponents/SuspenseFallbackMain';
import { CampaignListAppProvider } from './services/CampaignListAppContext';
import CampaignListMain from './widgets/CampaignListMain';

const store = {
  rejectReasonsStore: RejectReasonsStore.create(),
};

function CampaignListApp() {
  globalStyles();

  return (
    <Provider {...store}>
      <Suspense fallback={<SuspenseFallbackMain />}>
        <Paper>
          <SnackbarProvider maxSnack={MAX_COUNT_SNACK}>
            <CampaignListAppProvider>
              <CampaignListMain />
            </CampaignListAppProvider>
          </SnackbarProvider>
        </Paper>
      </Suspense>
    </Provider>
  );
}

export default CampaignListApp;
