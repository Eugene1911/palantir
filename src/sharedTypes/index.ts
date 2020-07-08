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
