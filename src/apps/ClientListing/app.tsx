import React from 'react';
import globalStyles from 'themes/global.styles';
import WrapperStartAppComponent from 'sharedComponents/WrapperStartAppComponent';
import NotifierStore from 'sharedWidgets/Notifier/services/NotifierStore';
import { SnackbarProvider } from 'notistack';
import { MAX_COUNT_SNACK } from 'config/constants';
import ClientListingStore from './stores/ClientListingStore';
import ClientListingMain from './widgets/ClientListingMain';

function ClientListingApp(): JSX.Element {
  globalStyles();

  const notifierStore = NotifierStore.create();
  const store = {
    clientListingStore: ClientListingStore.create({
      notifier: notifierStore,
    }),
    notifierStore,
  };

  return (
    <SnackbarProvider maxSnack={MAX_COUNT_SNACK}>
      <WrapperStartAppComponent store={store}>
        <ClientListingMain />
      </WrapperStartAppComponent>
    </SnackbarProvider>
  );
}

export default ClientListingApp;
