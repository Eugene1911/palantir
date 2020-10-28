import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import Notifier from 'sharedWidgets/Notifier';
import useGlobalStyles from 'themes/global.styles';
import { SnackbarProvider } from 'notistack';
import { MAX_COUNT_SNACK } from 'config/constants';
import NotifierStore from 'sharedWidgets/Notifier/services/NotifierStore';
import FilterSideStore from 'sharedWidgets/FilterSide/store/FilterSideStore';
import { RouterModel, syncHistoryWithStore } from 'mst-react-router';
import { createBrowserHistory } from 'history';
import SuspenseFallbackMain from 'sharedComponents/SuspenseFallbackMain';
import OptimizerCreate from './widgets/OptimizerCreate';
import OptimizersList from './widgets/OptimizersList';
import OptimizerCreateStore from './widgets/OptimizerCreate/store/OptimizerCreateStore';
import OptimizersListStore from './widgets/OptimizersList/store/OptimizersListStore';
import ChooseRulesStore from './widgets/ChooseRules/store/ChooseRulesStore';
import StoreProvider from './StoreProvider';

function OptimizersApp(): JSX.Element {
  const { path } = useRouteMatch();
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

  console.log('---OptimizersApp --');

  return (
    <SnackbarProvider maxSnack={MAX_COUNT_SNACK}>
      <Suspense fallback={<SuspenseFallbackMain />}>
        <StoreProvider {...store}>
          <Notifier />

          <Router>
            <Route exact path={path} component={OptimizersList} />
            <Route
              path={`${path}/create`}
              component={OptimizerCreate}
            />
            <Route
              path={`${path}/edit/:id`}
              component={OptimizerCreate}
            />
          </Router>
        </StoreProvider>
      </Suspense>
    </SnackbarProvider>
  );
}

export default OptimizersApp;
