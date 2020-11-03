import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';
import { INotifierStore } from 'sharedWidgets/Notifier/services/NotifierStore';
import { TFilterSideStore } from 'sharedWidgets/FilterSide/store/FilterSideStore';
import { IOptimizersListStore } from './widgets/OptimizersList/store/OptimizersListStore';
import { IOptimizerCreateStore } from './widgets/OptimizerCreate/store/OptimizerCreateStore';
// import { TChooseRulesStore } from './widgets/ChooseRules/store/ChooseRulesStore';

export type TOptimizersStors = {
  filterSideStore: TFilterSideStore;
  notifierStore: INotifierStore;
  optimizersListStore: IOptimizersListStore;
  optimizerCreateStore: IOptimizerCreateStore;
  // chooseRulesStore: TChooseRulesStore;
};

const useStores = (): any => {
  return useContext(MobXProviderContext);
};

export default useStores;
