import React, { Suspense } from 'react';
import Grid from '@material-ui/core/Grid';
import SuspenseFallbackMain from 'sharedComponents/SuspenseFallbackMain';
import CurrencyExchangeMainApp from 'apps/CurrencyExchange/app';
import UrlUnpackApp from 'apps/UrlUnpack/app';

import 'typeface-roboto';
import 'config/i18n';

function BackofficeToolsApp(): JSX.Element {
  return (
    <Suspense fallback={<SuspenseFallbackMain />}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CurrencyExchangeMainApp />
        </Grid>
        <Grid item xs={12} md={6}>
          <UrlUnpackApp />
        </Grid>
      </Grid>
    </Suspense>
  );
}

export default BackofficeToolsApp;
