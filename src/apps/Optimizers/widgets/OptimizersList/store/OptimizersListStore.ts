import { types, flow, Instance } from 'mobx-state-tree';
import { getOptimizersStrategies } from 'resources/api';
import mapValues from 'lodash/mapValues';
import formatReqestParams from 'helpers/formatReqestParams';
import { TPaginationResponse, TTableSortResponse } from 'sharedTypes';
import {
  PAGINATIONS_DEFAULT_COUNT_PAGE,
  DEBOUNCE_SEARCH_WAIT_TIME,
} from 'config/constants';
import debounce from 'lodash/debounce';

export const OptimizersListReqestParams = types.model(
  'OptimizersListReqestParams',
  {
    page: types.number,
    size: types.number,
    order: types.optional(types.string, ''),
    detailed: types.optional(types.boolean, false),
    search: types.string,
  },
);

export type IOptimizersListReqestParams = Instance<
  typeof OptimizersListReqestParams
>;

const OptimizersListStore = types
  .model('OptimizersListStore', {
    optimizers: types.optional(types.frozen(), []),
    requestParams: types.optional(OptimizersListReqestParams, {
      page: 1,
      size: PAGINATIONS_DEFAULT_COUNT_PAGE,
      search: '',
    }),
    isLoading: types.optional(types.boolean, false),
    count: types.optional(types.number, 0),
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
    debounceSearchInitParams(search: string, page: number): void {
      self.requestParams.search = search;
      self.requestParams.page = page;
      self.loadOptimizers();
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
        self.optimizers = response;

        self.isLoading = false;
      } catch (error) {
        self.isLoading = false;
        console.error('Failed to fetch projects', error);
      }
    }),
    onChangePaginationHandler: (peges: TPaginationResponse): void => {
      self.requestParams = Object.assign(self.requestParams, peges);
      self.loadOptimizers();
    },
    onChangeSortHandler: ({ order }: TTableSortResponse): void => {
      self.requestParams.order = order;
      self.loadOptimizers();
    },
    onChangeSearchHandler: ({
      target,
    }: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >): void => {
      const { value } = target;
      self.debounceLoadOptimizers(value, 0);
    },
  }));

export type IOptimizersListStore = Instance<
  typeof OptimizersListStore
>;

export default OptimizersListStore;
