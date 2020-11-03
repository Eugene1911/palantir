/* eslint-disable @typescript-eslint/camelcase */
import {
  types,
  flow,
  Instance,
  getParent,
  getSnapshot,
} from 'mobx-state-tree';
import findIndex from 'lodash/findIndex';
import { getOptimizersStrategies } from 'resources/api';
import {
  PAGINATIONS_DEFAULT_COUNT_PAGE,
  DEBOUNCE_SEARCH_WAIT_TIME,
} from 'config/constants';
import debounce from 'lodash/debounce';
import mapValues from 'lodash/mapValues';
import formatReqestParams from 'helpers/formatReqestParams';
import FilterSideStore from 'sharedWidgets/FilterSide/store/FilterSideStore';
import {
  OptimizersListReqestParams,
  IOptimizersListReqestParams,
} from '../../OptimizersList/store/OptimizersListStore';
import { TOptimizerModel } from '../../OptimizerCreate/store/OptimizerModel';
import RuleGroupModel, {
  TRuleGroupModel,
} from '../../OptimizerCreate/widgets/OptimizerRule/store/RuleGroupModel';

const ChooseRulesStore = types
  .model('ChooseRulesStore', {
    requestParams: types.optional(OptimizersListReqestParams, {
      page: 1,
      size: PAGINATIONS_DEFAULT_COUNT_PAGE,
      search: '',
      detailed: true,
    }),
    optimizers: types.optional(types.frozen(), []),
    isLoading: types.optional(types.boolean, false),
    filterSide: FilterSideStore,
    selectRules: types.optional(types.array(RuleGroupModel), []),
    groupId: types.maybeNull(types.number),
  })
  .views(self => ({
    get params(): IOptimizersListReqestParams {
      return mapValues(self.requestParams, formatReqestParams);
    },
  }))
  .actions((self: any) => ({
    afterCreate(): void {
      self.debounceLoadOptimizers = debounce(
        self.debounceSearchInitParams,
        DEBOUNCE_SEARCH_WAIT_TIME,
      );
    },
    loadOptimizers: flow(function* loadTableResources() {
      self.isLoading = true;
      try {
        const { params } = self;
        const { data } = yield getOptimizersStrategies(params);
        const { response, page, count, page_size: pageSize } = data;

        self.requestParams.page = page;
        self.requestParams.size = pageSize;
        self.count = count;
        self.optimizers = response.filter(
          (optimizer: TOptimizerModel) => !!optimizer.rule_groups,
        );

        self.isLoading = false;
      } catch (error) {
        self.isLoading = false;
        console.error('Failed to fetch projects', error);
      }
    }),
    debounceSearchInitParams(search: string, page: number): void {
      self.requestParams.search = search;
      self.requestParams.page = page;
      self.loadOptimizers();
    },
    onSelectRuleHandler(rule: TRuleGroupModel): void {
      const indexRule = findIndex(self.selectRules, { id: rule.id });
      const noRule = indexRule === -1;

      if (noRule) {
        self.selectRules.push(rule);
      } else {
        self.selectRules.splice(indexRule, 1);
      }
    },
    onApplayChooseRules(): void {
      const { groupId, selectRules } = self;
      const { optimizer }: any = getParent(self);
      const { rule_groups }: any = optimizer;
      const group = rule_groups.find(({ id }: any) => groupId === id);

      selectRules.map((selectRule: any) =>
        group.onAddRule(getSnapshot(selectRule)),
      );
    },
    onChangeSearchHandler: ({
      target,
    }: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >): void => {
      const { value } = target;
      self.debounceLoadOptimizers(value, 1);
    },
    onOpenChooseList(groupId: number): void {
      self.groupId = groupId;

      self.filterSide.onSetStateHandler(true);
    },
  }));

export type TChooseRulesStore = Instance<typeof ChooseRulesStore>;

export default ChooseRulesStore;
