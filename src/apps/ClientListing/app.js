import 'typeface-roboto';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { SnackbarProvider } from 'notistack';
import { MAX_COUNT_SNACK } from 'config/constants';
import { Provider } from 'mobx-react';
import globalStyles from 'themes/global.styles';
import ClientListingFilter from './widgets/ClientListingFilter';
import ClientListingTable from './widgets/ClientListingTable';
import ClientListingStore from './stores/ClientListingStore';

const store = {
  clientListingStore: ClientListingStore.create(),
};

function ClientListingApp() {
  globalStyles();

  return (
    <Provider {...store}>
      <Paper>
        <SnackbarProvider maxSnack={MAX_COUNT_SNACK}>
          <CardContent>
            <Typography variant="h5" component="h3" gutterBottom>
              CLIENT LISTING
            </Typography>
            <ClientListingFilter />
          </CardContent>
          <ClientListingTable />
        </SnackbarProvider>
      </Paper>
    </Provider>
  );
}

export default ClientListingApp;
