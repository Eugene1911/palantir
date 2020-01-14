import React from 'react';
import globalStyles from 'themes/global.styles';
import WrapperStartAppComponent from 'sharedComponents/WrapperStartAppComponent';
import ClientListingStore from './stores/ClientListingStore';
import ClientListingMain from './widgets/ClientListingMain';

function ClientListingApp(): JSX.Element {
  globalStyles();

  const store = {
    clientListingStore: ClientListingStore.create(),
  };

  return (
    <WrapperStartAppComponent store={store}>
      <ClientListingMain />
    </WrapperStartAppComponent>
  );
}

export default ClientListingApp;
