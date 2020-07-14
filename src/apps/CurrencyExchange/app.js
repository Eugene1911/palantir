import 'typeface-roboto';
import React from 'react';
import 'config/i18n';
import { Provider } from 'mobx-react';
import CurrencyExchangeMain from './widgets/CurrencyExchangeMain';
import CurrencyExchangeStore from './stores/CurrencyExchangeStore';

const store = {
  CurrencyExchangeStore: CurrencyExchangeStore.create(),
};

function CurrencyExchangeMainApp() {
  return (
    <Provider {...store}>
      <CurrencyExchangeMain />
    </Provider>
  );
}

export default CurrencyExchangeMainApp;
