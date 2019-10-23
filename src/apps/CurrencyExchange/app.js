import 'typeface-roboto';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { SnackbarProvider } from 'notistack';
import { MAX_COUNT_SNACK } from 'config/constants';
import { Provider } from 'mobx-react';
import CurrencyExchangeStore from './stores/CurrencyExchangeStore';
import CurrencyExchangeForm from './widgets/CurrencyExchangeForm';

const store = {
  CurrencyExchangeStore: CurrencyExchangeStore.create(),
};

function ToolsApp() {
  return (
    <Provider {...store}>
      <Paper>
        <SnackbarProvider maxSnack={MAX_COUNT_SNACK}>
          <CardContent>
            <Typography variant="h5" component="h3" gutterBottom>
              CURRENCY EXCHANGE
            </Typography>
            <CurrencyExchangeForm />
          </CardContent>
        </SnackbarProvider>
      </Paper>
    </Provider>
  );
}

export default ToolsApp;
