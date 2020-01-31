import { useState, useEffect } from 'react';
import { getFormats } from 'resources/api';

function useFormatMultiSelect(onChange, value) {
  const [selectedValue, setSelectedValue] = useState([]);
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const onOpenHandler = () => {
    if (!autocompleteData.length) setIsLoading(true);
  };
  const onChangeHandler = (event, selectedValues) => {
    setSelectedValue(selectedValues);
    onChange(
      selectedValues.map(({ id }) => id),
      selectedValues,
    );
  };
  const onLoadFormatsHook = () => {
    const loadFormats = async () => {
      const { data } = await getFormats();
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
  const onChangeValueHook = () => {
    if (value.length !== selectedValue.length) {
      setSelectedValue(
        autocompleteData.filter(({ id }) => value.includes(id)),
      );
    }
  };

  useEffect(onLoadFormatsHook, [isLoading]);
  useEffect(onChangeValueHook, [value.length]);

  return {
    isLoading,
    selectedValue,
    autocompleteData,
    onOpenHandler,
    onChangeHandler,
  };
}

export default useFormatMultiSelect;
