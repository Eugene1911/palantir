import { types, flow } from 'mobx-state-tree';
import {
  LOAD_STATES,
  USERS_ROLES,
  MAX_COUNT_LOAD_USERS,
} from 'config/constants';
import {
  getClientFiscalStatus,
  getClientStatuses,
  getClientRols,
  getUsers,
} from 'resources/api';

const ClientListingFilterStore = types
  .model('ClientListingFilterStore', {
    resources: types.frozen(),
    state: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
  })
  .views(self => ({
    get getCampaigns(): any {
      return self.resources.getCampaigns;
    },
  }))
  .actions(self => ({
    getResources: flow(function* getResources() {
      self.state = LOAD_STATES.PENDING;

      try {
        const [
          clientFiscalStatus,
          clientStatuses,
          clientRols,
          managers,
        ] = yield Promise.all([
          getClientFiscalStatus(),
          getClientStatuses(),
          getClientRols(),
          getUsers({
            size: MAX_COUNT_LOAD_USERS,
            roles: USERS_ROLES.MANAGER,
          }),
        ]);

        self.state = LOAD_STATES.DONE;

        self.resources = {
          clientFiscalStatus,
          clientStatuses,
          clientRols,
          managers: managers.data.response,
        };
      } catch (error) {
        console.error('Failed to fetch projects', error);

        self.state = LOAD_STATES.ERROR;
      }
    }),
  }));

export default ClientListingFilterStore;
