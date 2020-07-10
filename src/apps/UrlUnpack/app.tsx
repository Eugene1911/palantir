import 'typeface-roboto';
import React from 'react';
import 'config/i18n';
import { Provider } from 'mobx-react';
import NotifierStore from 'sharedWidgets/Notifier/services/NotifierStore';
import { MAX_COUNT_SNACK } from 'config/constants';
import { SnackbarProvider } from 'notistack';
import Notifier from 'sharedWidgets/Notifier';
import UrlUnpackMain from './widgets/UrlUnpackMain';
import UrlUnpackFormStore from './widgets/UrlUnpackForm/stores/urlUnpackFormStore';

const notifierStore = NotifierStore.create();
const store = {
  urlUnpackFormStore: UrlUnpackFormStore.create({
    notifier: notifierStore,
  }),
  notifierStore,
};

function UrlUnpackApp(): JSX.Element {
  return (
    <SnackbarProvider maxSnack={MAX_COUNT_SNACK}>
      <Provider {...store}>
        <UrlUnpackMain />
        <Notifier />
      </Provider>
    </SnackbarProvider>
  );
}

export default UrlUnpackApp;
