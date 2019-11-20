import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from 'config/constants';
import { getApplications } from 'resources/api';

const AdvancedCustomStatisticsFilterStore = types
  .model('AdvancedCustomStatisticsFilterStore', {
    applicationsList: types.frozen([]),
    filterResources: types.frozen(),
    filterState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
  })
  .actions(self => ({
    getApplications: flow(function*(params) {
      self.clientsListState = LOAD_STATES.PENDING;

      try {
        const response = yield getApplications({
          url: params,
          name: params,
        });

        self.clientsListState = LOAD_STATES.DONE;

        self.applicationsList = response.data.response;
      } catch (error) {
        self.clientsListState = LOAD_STATES.ERROR;
      }
    }),
  }));

export default AdvancedCustomStatisticsFilterStore;
