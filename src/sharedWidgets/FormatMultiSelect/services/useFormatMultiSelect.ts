import { useState, useEffect } from 'react';
import { UseAutocompleteProps } from '@material-ui/lab';
import { TMultiSelectOnChangeHandler, TFormatAPI } from 'sharedTypes';
import { getFormats } from 'resources/api';

export type TUseFormatMultiSelect = {
  isLoading: boolean;
  selectedValue: Array<number>;
  autocompleteData: Array<TFormatAPI>;
  onOpenHandler: UseAutocompleteProps['onOpen'];
  onChangeHandler: UseAutocompleteProps['onChange'];
  getOptionLabel: UseAutocompleteProps['getOptionLabel'];
};

function useFormatMultiSelect(
  onChange: TMultiSelectOnChangeHandler<TFormatAPI>,
  value: Array<number>,
): TUseFormatMultiSelect {
  const [selectedValue, setSelectedValue] = useState([]);
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const onOpenHandler = (): void => {
    if (!autocompleteData.length) setIsLoading(true);
  };
  const onChangeHandler = (
    event: React.ChangeEvent<{}>,
    selectedValues: Array<TFormatAPI>,
  ): void => {
    setSelectedValue(selectedValues);
    onChange(
      selectedValues.map(({ id }) => id),
      selectedValues,
    );
  };
  const onLoadFormatsHook = (): void => {
    const loadFormats = async (): Promise<void> => {
      const { data }: { data: Array<TFormatAPI> } = await getFormats(
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
  const getOptionLabel = ({ name }: TFormatAPI): string => name;

  useEffect(onLoadFormatsHook, [isLoading]);
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

export default useFormatMultiSelect;
