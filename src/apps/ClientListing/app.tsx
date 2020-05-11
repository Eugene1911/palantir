import React from 'react';
import useGlobalStyles from 'themes/global.styles';
import WrapperStartAppComponent from 'sharedComponents/WrapperStartAppComponent';
import ClientListingStore from './stores/ClientListingStore';
import ClientListingMain from './widgets/ClientListingMain';

function ClientListingApp(): JSX.Element {
  useGlobalStyles({});

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
