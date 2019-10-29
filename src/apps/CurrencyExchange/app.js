import 'typeface-roboto';
import React, { Suspense } from 'react';
import 'config/i18n';
import { Provider } from 'mobx-react';
import SuspenseFallbackMain from 'sharedComponents/SuspenseFallbackMain';
import CurrencyExchangeMain from './widgets/CurrencyExchangeMain';
import CurrencyExchangeStore from './stores/CurrencyExchangeStore';

const store = {
  CurrencyExchangeStore: CurrencyExchangeStore.create(),
};

function ToolsApp() {
  return (
    <Provider {...store}>
      <Suspense fallback={<SuspenseFallbackMain />}>
        <CurrencyExchangeMain />
      </Suspense>
    </Provider>
  );
}

export default ToolsApp;
