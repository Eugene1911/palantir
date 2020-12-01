export type TMultiSelectOnChangeHandler<T> = (
  idsList: Array<number>,
  valueList: Array<T>,
) => void;

export type TDeviceAPI = {
  id: number;
  name: string;
  rtb: Array<number>;
};

export type TOSAPI = {
  id: number;
  name: string;
  type: number;
};

export type TLanguagesAPI = {
  code: string;
  id: number;
  name: string;
  native_name: string;
};

export type TBrowserAPI = {
  id: number;
  name: string;
};

export type TFormatAPI = {
  id: number;
  name: string;
  width?: number;
  height?: number;
  type: string;
  hidden: boolean;
};

export type TCategoriesAPI = {
  name: string;
  id: number;
  parent_id?: number;
};

export type TCategoriesGroupByParentId = {
  name: string;
  id: number;
  categories: Array<TCategoriesAPI>;
};

export type TOptionFilterMultiSelect = {
  name?: string;
  id?: number;
};

export type TCommonFetchingDataType = {
  name: string;
  id: number;
};

export type TCommonFetchingDataValueType = {
  name: string;
  value: number;
};

export type TOptimizerStrategy = {
  id: number;
  user_id: number;
  external_id: number;
  status: string;
  title: string;
  created_at: string;
  updated_at: string;
  linked_at: string;
  default_time_interval: string;
  sources: Array<string>;
  rule_count: number;
  campaign_count: number;
};

export type TPaginationResponse = {
  page?: number;
  size?: number;
};

export type TTableSortResponse = {
  order: string;
};

export type AnyFunction = (...args: any[]) => any;

export enum ProxyTrafficTypes {
  ALL = 'all',
  PROXY = 'proxy',
  NON_PROXY = 'non_proxy',
}

export interface IUrlParamsType {
  mode: string;
  id: string;
}
