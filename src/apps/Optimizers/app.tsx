import React, { Suspense } from 'react';
import Notifier from 'sharedWidgets/Notifier';
import useGlobalStyles from 'themes/global.styles';
import { SnackbarProvider } from 'notistack';
import { MAX_COUNT_SNACK } from 'config/constants';
import NotifierStore from 'sharedWidgets/Notifier/services/NotifierStore';
import FilterSideStore from 'sharedWidgets/FilterSide/store/FilterSideStore';
import { RouterModel, syncHistoryWithStore } from 'mst-react-router';
import { createBrowserHistory } from 'history';
import SuspenseFallbackMain from 'sharedComponents/SuspenseFallbackMain';
import OptimizerCreateStore from './widgets/OptimizerCreate/store/OptimizerCreateStore';
import OptimizersListStore from './widgets/OptimizersList/store/OptimizersListStore';
import ChooseRulesStore from './widgets/ChooseRules/store/ChooseRulesStore';
import StoreProvider from './StoreProvider';
import AppRouters from './appRouters';

function OptimizersApp(): JSX.Element {
  const routerModel = RouterModel.create();
  const history = syncHistoryWithStore(
    createBrowserHistory(),
    routerModel,
  );
  const notifierStore = NotifierStore.create();
  const store = {
    notifierStore,
    history,
    optimizersListStore: OptimizersListStore.create({}),
    optimizerCreateStore: OptimizerCreateStore.create({
      notifier: notifierStore,
      router: routerModel,
      chooseRules: ChooseRulesStore.create({
        filterSide: FilterSideStore.create({
          isFilterSideOpen: false,
        }),
      }),
    }),
  };

  useGlobalStyles({});

  return (
    <SnackbarProvider maxSnack={MAX_COUNT_SNACK}>
      <Suspense fallback={<SuspenseFallbackMain />}>
        <StoreProvider {...store}>
          <Notifier />
          <AppRouters />
        </StoreProvider>
      </Suspense>
    </SnackbarProvider>
  );
}

export default OptimizersApp;
