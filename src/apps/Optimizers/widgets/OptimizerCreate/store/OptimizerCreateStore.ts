/* eslint-disable @typescript-eslint/camelcase */
import { types, flow, Instance } from 'mobx-state-tree';
import { getOptimizer, getOptimizerVariables } from 'resources/api';
import NotifierStore from 'sharedWidgets/Notifier/services/NotifierStore';
import { RouterModel } from 'mst-react-router';
import { defaultOptimizerGroup } from '../widgets/OptimizerGroup/store/OptimizerGroupModel';
import OptimizerModel from './OptimizerModel';
import ChooseRulesStore from '../../ChooseRules/store/ChooseRulesStore';

const defaultOptimizer = {
  status: 'active',
  default_time_interval: 'yesterday',
  rule_count: 0,
  rule_group_count: 0,
  action_count: 0,
  // rule_groups: [],
};

const OptimizerCreateStore = types
  .model('OptimizerCreateStore', {
    optimizer: types.optional(OptimizerModel, defaultOptimizer),
    isLoading: types.optional(types.boolean, false),
    optimizerVariables: types.frozen(),
    chooseRules: ChooseRulesStore,
    notifier: types.optional(NotifierStore, {}),
    router: RouterModel,
    isShowLeaveDialog: types.optional(types.boolean, false),
  })
  .actions((self: any) => ({
    loadResources: flow(function* loadResourcesPages(id) {
      self.isLoading = true;
      try {
        if (id) {
          yield self.loadOptimazer(id);
        } else {
          self.optimizer = defaultOptimizer;
        }
        yield self.loadOptimizerVariables();

        self.isLoading = false;
      } catch (error) {
        self.isLoading = false;
        console.error('Failed to fetch projects', error);
      }
    }),
    loadOptimazer: flow(function* loadOptimazerResources(id) {
      try {
        const { data } = yield getOptimizer(id, { detailed: true });
        const { response } = data;

        self.optimizer = response;
      } catch (error) {
        console.error('Failed to fetch projects', error);
      }
    }),
    loadOptimizerVariables: flow(
      function* loadOptimizerVariablesResources() {
        try {
          const { data } = yield getOptimizerVariables({});
          const { response } = data;

          self.optimizerVariables = response;
        } catch (error) {
          console.error('Failed to load optimizer variables', error);
        }
      },
    ),

    onLeavePageDialogAgreeHandler(): void {
      self.onLeavePageDialogCloseHandler();
      self.router.goBack();
    },
    onLeavePageDialogCloseHandler(): void {
      self.isShowLeaveDialog = false;
    },
    onCancelPageHandler(): void {
      self.isShowLeaveDialog = true;
    },

    addItemToGroup(): void {
      const group = { ...defaultOptimizerGroup };
      const { title = '' } = self.optimizer;
      const { title: groupTitle } = group;
      const countGroups = self.optimizer.rule_groups.length;
      group.description = `${title}_${groupTitle} ${countGroups + 1}`;
      self.optimizer.rule_groups.push(group);
    },
    onDeleteGroupHandler(index: number): void {
      self.optimizer.rule_groups.splice(index, 1);
    },
  }));

export type IOptimizerCreateStore = Instance<
  typeof OptimizerCreateStore
>;

export default OptimizerCreateStore;
