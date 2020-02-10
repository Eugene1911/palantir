/* eslint-disable @typescript-eslint/camelcase */
import {
  types,
  flow,
  Instance,
  IAnyStateTreeNode,
} from 'mobx-state-tree';
import { LOAD_STATES } from 'config/constants';
import emptyFieldsToNull from 'helpers/emptyFieldsToNull';
import { getUsers } from 'resources/api';
import ClientListingFilterStore from '../widgets/ClientListingFilter/stores/ClientListingFilterStore';
import ClientListingFilterResourceStore from '../widgets/ClientListingFilter/stores/ClientListingFilterResourceStore';

const initClientFilterState = {
  id: '',
  email: '',
  company_name: '',
  fiscal_status: '',
  status: '',
  account_manager_id: '',
  role: '',
};

const ClientListingStore = types
  .model('ClientListingStore', {
    filter: types.optional(ClientListingFilterStore, {}),
    filterResources: types.optional(
      ClientListingFilterResourceStore,
      {
        resources: {},
      },
    ),
    requestParams: types.optional(
      types.frozen(),
      initClientFilterState,
    ),
    clientsListState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
    countPage: types.optional(types.number, 0),
    clientsList: types.optional(types.frozen(), []),
    clientsListPages: types.optional(types.frozen(), {}),
  })
  .views(self => ({
    get requestParamsWithoutEmpty() {
      return emptyFieldsToNull(self.requestParams);
    },
  }))
  .actions((self: IAnyStateTreeNode) => ({
    afterCreate() {
      self.getClientList();
    },
    getClientList: flow(function* getResources() {
      const params = self.filter.requestParams;

      self.clientsListState = LOAD_STATES.PENDING;

      try {
        const { data } = yield getUsers(params);
        const { page, count, page_size } = data;

        self.clientsListState = LOAD_STATES.DONE;

        self.clientsList = data.response;
        self.countPage = count;
        self.filter.setPagination({
          page,
          size: page_size,
        });
        self.clientsListPages = data;
      } catch (error) {
        console.error('Failed to fetch projects', error);
        self.clientsListState = LOAD_STATES.ERROR;
      }
    }),
  }));

export type IClientListingStore = Instance<typeof ClientListingStore>;

export default ClientListingStore;
