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

export type TOptionFilterMultiSelect = {
  name?: string;
  id?: number;
};
