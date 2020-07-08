/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { types, flow, Instance } from 'mobx-state-tree';
import {
  NOTIFIER_DEFAULT_OPTIONS,
  LOAD_STATES,
} from 'config/constants';

import emptyFieldsToNull from 'helpers/emptyFieldsToNull';
import NotifierStore from 'sharedWidgets/Notifier/services/NotifierStore';
import { notiferActionOk } from 'sharedComponents/NotiferActionOk';
import {
  getUsers,
  getTrafficSourceType,
  patchUsers,
} from 'resources/api';
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
    trafficSourceType: types.optional(types.frozen(), []),
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
    notifier: types.optional(NotifierStore, {}),
  })
  .views(self => ({
    get requestParamsWithoutEmpty() {
      return emptyFieldsToNull(self.requestParams);
    },
  }))
  .actions((self: any) => ({
    afterCreate(): void {
      self.getClientList();
      self.getTrafficSourceType();
    },
    getTrafficSourceType: flow(
      function* getTrafficSourceTypeResources() {
        try {
          const trafficSourceType = yield getTrafficSourceType();

          self.trafficSourceType = trafficSourceType.filter(
            ({ value }: any) => !!value,
          );
        } catch (error) {
          console.error('Failed to fetch projects', error);
        }
      },
    ),
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
    changeUser: flow(function* changeUser(id: number, params) {
      try {
        const { data } = yield patchUsers(id, params);

        self.clientsList = self.clientsList.map(
          (client: any): void => {
            if (client.id === data.id) return data;
            return client;
          },
        );
      } catch (error) {
        console.error('Failed to fetch projects', error);
      }
    }),
    onChangeTrafficSourceType: async (
      id: number,
      {
        target,
      }: React.ChangeEvent<{
        name: string;
        value: string;
      }>,
    ): Promise<void> => {
      const { value } = target;

      await self.changeUser(id, {
        traffic_source_type: value,
      });

      self.notifier.pushSnackbar({
        message: 'Client was changed',
        options: {
          ...NOTIFIER_DEFAULT_OPTIONS,
          action: notiferActionOk,
        },
      });
    },
  }));

export type IClientListingStore = Instance<typeof ClientListingStore>;

export default ClientListingStore;
