import {
  types,
  Instance,
  getParent,
  IAnyStateTreeNode,
} from 'mobx-state-tree';
import mapValues from 'lodash/mapValues';
import formatReqestParams from 'helpers/formatReqestParams';
import { PAGINATIONS_DEFAULT_COUNT_PAGE } from 'config/constants';

const START_PAGE = 1;

const ClientListingFilterStore = types
  .model({
    id: types.optional(types.string, ''),
    account_manager_id: types.optional(
      types.union(types.number, types.string),
      '',
    ),
    email: types.optional(types.string, ''),
    role: types.optional(types.string, ''),
    company_name: types.optional(types.string, ''),
    fiscal_status: types.optional(types.string, ''),
    status: types.optional(types.string, ''),
    order: types.optional(types.string, ''),
    page: types.optional(types.number, START_PAGE),
    size: types.optional(
      types.number,
      PAGINATIONS_DEFAULT_COUNT_PAGE,
    ),
  })
  .views((self: any) => ({
    get requestParams(): any {
      return mapValues(self, formatReqestParams);
    },
  }))
  .actions((self: IAnyStateTreeNode) => ({
    onSubmitFilterHandler: (
      event: React.FormEvent<Element>,
    ): void => {
      const { getClientList } = getParent(self);
      event.preventDefault();
      self.page = START_PAGE;
      getClientList();
    },
    onChangePaginationHandler: (params: any): void => {
      const { getClientList } = getParent(self);
      self.setPagination(params);
      getClientList();
    },
    setPagination: ({ page, size }: any): void => {
      self.page = page || self.page;
      self.size = size || self.size;
    },
    onChangeOrderHandler: ({
      order,
    }: Record<string, string>): void => {
      const { getClientList } = getParent(self);
      self.order = order;
      getClientList();
    },
    onChangeClientFilterFielsHandler: ({
      target,
    }: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>): void => {
      const { name, value } = target;
      self[name] = value;
    },
  }));

export type IClientListingFilterStore = Instance<
  typeof ClientListingFilterStore
>;

export default ClientListingFilterStore;
