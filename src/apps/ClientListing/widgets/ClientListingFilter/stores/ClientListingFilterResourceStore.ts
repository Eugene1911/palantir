import { types, flow, Instance } from 'mobx-state-tree';
import {
  LOAD_STATES,
  USERS_ROLES,
  MAX_COUNT_LOAD_USERS,
} from 'config/constants';
import {
  getRetentionClientsFlag,
  getClientFiscalStatus,
  getClientStatuses,
  getClientRols,
  getUsers,
} from 'resources/api';

const ClientListingFilterResourceStore = types
  .model({
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
  .actions((self: any) => ({
    afterCreate() {
      self.getResources();
    },
    getResources: flow(function* getResources() {
      self.state = LOAD_STATES.PENDING;

      try {
        const [
          retentionClientsFlag,
          clientFiscalStatus,
          clientStatuses,
          clientRols,
          managers,
        ] = yield Promise.all([
          getRetentionClientsFlag(),
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
          retentionClientsFlag,
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

export type IClientListingFilterResourceStore = Instance<
  typeof ClientListingFilterResourceStore
>;

export default ClientListingFilterResourceStore;
