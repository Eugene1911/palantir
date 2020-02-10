import { useState, useEffect } from 'react';
import { UseAutocompleteProps } from '@material-ui/lab';
import { AxiosResponse } from 'axios';
import {
  TMultiSelectOnChangeHandler,
  TOSAPI,
  TBrowserAPI,
  TDeviceAPI,
} from '../sharedTypes';

type TUnionFilterMultiSelect = TOSAPI | TBrowserAPI | TDeviceAPI;

export type TUseFilterMultiSelect = {
  isLoading: boolean;
  selectedValue: Array<number>;
  autocompleteData: Array<TUnionFilterMultiSelect>;
  onOpenHandler: UseAutocompleteProps['onOpen'];
  onChangeHandler: UseAutocompleteProps['onChange'];
  getOptionLabel: UseAutocompleteProps['getOptionLabel'];
};

function useFilterMultiSelect<T extends TUnionFilterMultiSelect>(
  onChange: TMultiSelectOnChangeHandler<T>,
  value: Array<number>,
  getResource: (
    params: Record<string, any>,
  ) => Promise<AxiosResponse<Array<T>>>,
): TUseFilterMultiSelect {
  const [selectedValue, setSelectedValue] = useState([]);
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const onOpenHandler: UseAutocompleteProps['onOpen'] = (): void => {
    if (!autocompleteData.length) setIsLoading(true);
  };
  const onChangeHandler = (
    event: React.ChangeEvent<{}>,
    selectedValues: Array<T>,
  ): void => {
    setSelectedValue(selectedValues);
    onChange(
      selectedValues.map(({ id }) => id),
      selectedValues,
    );
  };
  const onLoadDevicesHook = (): void => {
    const loadFormats = async (): Promise<void> => {
      const { data }: AxiosResponse<Array<T>> = await getResource(
        null,
      );
      const selected = data.filter(({ id }) => value.includes(id));
      setAutocompleteData(data);
      setSelectedValue(selected);
      onChange(
        selected.map(({ id }) => id),
        selected,
      );
      setIsLoading(false);
    };
    if (
      (isLoading && !autocompleteData.length) ||
      (value.length && !autocompleteData.length)
    ) {
      loadFormats();
    }
  };
  const onChangeValueHook = (): void => {
    if (value.length !== selectedValue.length) {
      setSelectedValue(
        autocompleteData.filter(({ id }) => value.includes(id)),
      );
    }
  };
  const getOptionLabel = ({ name }: T): string => name;

  useEffect(onLoadDevicesHook, [isLoading]);
  useEffect(onChangeValueHook, [value.length]);

  return {
    isLoading,
    selectedValue,
    autocompleteData,
    onOpenHandler,
    onChangeHandler,
    getOptionLabel,
  };
}

export default useFilterMultiSelect;
