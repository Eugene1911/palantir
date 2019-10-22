import 'typeface-roboto';
import 'config/i18n';
import React, { Suspense } from 'react';
import { Provider } from 'mobx-react';
import SuspenseFallbackMain from 'sharedComponents/SuspenseFallbackMain';
import ClientListingStore from './stores/ClientListingStore';
import ClientListingMain from './widgets/ClientListingMain';

const store = {
  clientListingStore: ClientListingStore.create(),
};

function ClientListingApp() {
  return (
    <Provider {...store}>
      <Suspense fallback={<SuspenseFallbackMain />}>
        <ClientListingMain />
      </Suspense>
    </Provider>
  );
}

export default ClientListingApp;
