import React from 'react';
import globalStyles from 'themes/global.styles';
import ClientListingStore from './stores/ClientListingStore';
import ClientListingMain from './widgets/ClientListingMain';
import WrapperStartAppComponent from 'sharedComponents/WrapperStartAppComponent';

const store = {
  clientListingStore: ClientListingStore.create(),
};

function ClientListingApp(): JSX.Element {
  globalStyles();

  return (
    <WrapperStartAppComponent store={store}>
      <ClientListingMain />
    </WrapperStartAppComponent>
  );
}

export default ClientListingApp;
