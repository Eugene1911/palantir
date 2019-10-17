import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from 'config/constants';
import emptyFieldsToNull from 'helpers/emptyFieldsToNull';
import { getUsers } from 'resources/api';
import ClientListingFilterStore from '../widgets/ClientListingFilter/stores/ClientListingFilterStore';

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
    filterStore: types.optional(ClientListingFilterStore, {
      resources: {},
    }),
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
    clientsList: types.optional(types.frozen(), []),
    clientsListPages: types.optional(types.frozen(), {}),
  })
  .views(self => ({
    get requestParamsWithoutEmpty() {
      return emptyFieldsToNull(self.requestParams);
    },
  }))
  .actions(self => ({
    getClientList: flow(function* getResources() {
      const params = self.requestParamsWithoutEmpty;

      self.clientsListState = LOAD_STATES.PENDING;

      try {
        const response = yield getUsers(params);

        self.clientsListState = LOAD_STATES.DONE;

        self.clientsList = response.data.response;
        self.clientsListPages = response.data;
      } catch (error) {
        console.error('Failed to fetch projects', error);
        self.clientsListState = LOAD_STATES.ERROR;
      }
    }),

    requestFromFilter(newParams) {
      self.setRequestParams({
        ...newParams,
        page: 0,
      });
      self.getClientList();
    },

    setRequestGetClients(newParams) {
      self.setRequestParams(newParams);
      self.getClientList();
    },

    setRequestParams(newParams) {
      self.requestParams = {
        ...self.requestParams,
        ...newParams,
      };
    },
  }));

export default ClientListingStore;
