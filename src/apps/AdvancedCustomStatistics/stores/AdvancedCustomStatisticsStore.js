import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from 'config/constants';
import {
  getPublisherCustomReport,
  GROUP_TYPES_CUSTOM_REPORTS,
} from 'resources/api';

const AdvancedCustomStatisticsStore = types
  .model('AdvancedCustomStatisticsStore', {
    statsList: types.frozen([]),
    statsListState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
  })
  .actions(self => ({
    getStats: flow(function*(params) {
      self.statsListState = LOAD_STATES.PENDING;

      try {
        const response = yield getPublisherCustomReport(
          GROUP_TYPES_CUSTOM_REPORTS.day,
          params,
        );

        self.statsListState = LOAD_STATES.DONE;

        self.statsList = response.data;
      } catch (error) {
        self.statsListState = LOAD_STATES.ERROR;
      }
    }),
  }));

export default AdvancedCustomStatisticsStore;
