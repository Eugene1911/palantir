import { types, flow } from 'mobx-state-tree';
import { subMonths } from 'date-fns';
import { LOAD_STATES } from 'config/constants';
import {
  getPublisherCustomReport,
  GROUP_TYPES_CUSTOM_REPORTS,
} from 'resources/api';
import tableSchemeProcessing from 'helpers/statistic/tableSchemeProcessing';
import statsDataProcessing from 'helpers/statistic/processing';
import AdvancedCustomStatisticsFilter from '../widgets/AdvancedCustomStatisticsFilter/store/AdvancedCustomStatisticsFilterStore';
import tableScheme from '../widgets/AdvancedCustomStatisticsTable/tableScheme';
import AdvancedCustomStatisticsTagsStore from '../widgets/AdvancedCustomStatisticsTags/store/AdvancedCustomStatisticsTagsStore';

const LAST_MOUNTH = subMonths(new Date(), 2);
const TODAY = new Date();
const CampaignModal = types.model({
  id: types.number,
  name: types.string,
});

const AdvancedCustomStatisticsStore = types
  .model({
    filter: types.optional(AdvancedCustomStatisticsFilter, {
      countries: ['A1', 'DE', 'FR'],
      app_id: [8098, 4893, 6360, 30, 12],
      spot_id: [3658754, 3658753, 3658752, 3658727],
      format_id: [1, 23, 105],
      device_id: [],
      date_from: LAST_MOUNTH,
      date_to: TODAY,
    }),
    statsList: types.frozen([]),
    statsListForChart: types.frozen([]),
    statsListState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
    isLoadingStatsByOrder: types.optional(types.boolean, false),
    campaign: types.frozen(CampaignModal),
    tableScheme: types.frozen([]),
    advancedCustomStatisticsTags: types.optional(
      AdvancedCustomStatisticsTagsStore,
      {},
    ),
  })
  .actions(self => ({
    afterCreate() {
      self.setActualTableScheme();
      self.getStats();
    },
    setActualTableScheme() {
      const actualTableScheme = tableSchemeProcessing(
        tableScheme,
        self.campaign,
      );

      self.tableScheme = actualTableScheme;
    },
    getStatsByOrder: flow(function* getStats() {
      self.isLoadingStatsByOrder = true;

      try {
        const data = yield self.requestStats();

        self.isLoadingStatsByOrder = false;

        self.setStatsDataProcessing(data);
      } catch (error) {
        self.isLoadingStatsByOrder = false;
      }
    }),
    getStats: flow(function* getStats() {
      self.statsListState = LOAD_STATES.PENDING;

      try {
        const data = yield self.requestStats();

        self.statsListState = LOAD_STATES.DONE;

        self.statsListForChart = data;
        self.setStatsDataProcessing(data);
      } catch (error) {
        self.statsListState = LOAD_STATES.ERROR;
      }
    }),
    setStatsDataProcessing(data) {
      self.statsList = statsDataProcessing(data, self.tableScheme);
    },
    requestStats: flow(function* getStats() {
      const { requestParams } = self.filter;
      const { data } = yield getPublisherCustomReport(
        GROUP_TYPES_CUSTOM_REPORTS.day,
        requestParams,
      );

      return data;
    }),
  }));

export default AdvancedCustomStatisticsStore;
