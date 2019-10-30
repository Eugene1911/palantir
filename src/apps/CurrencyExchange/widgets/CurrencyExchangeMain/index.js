import React from 'react';
import { withTranslation, useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { SnackbarProvider } from 'notistack';
import { MAX_COUNT_SNACK } from 'config/constants';
import CurrencyExchangeForm from '../CurrencyExchangeForm';

function CurrencyExchangeMain() {
  const { t } = useTranslation();

  return (
    <Paper>
      <SnackbarProvider maxSnack={MAX_COUNT_SNACK}>
        <CardContent>
          <Typography variant="h5" component="h3" gutterBottom>
            {t('currency_exchange:title')}
          </Typography>
          <CurrencyExchangeForm />
        </CardContent>
      </SnackbarProvider>
    </Paper>
  );
}

export default withTranslation(['currency_exchange'])(
  CurrencyExchangeMain,
);
