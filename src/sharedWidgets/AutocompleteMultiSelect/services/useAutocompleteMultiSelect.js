import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {
  MAX_COUNT_SELECTED_ITEMS,
  ALL_ITEAM_MULTISELECT,
} from 'config/constants';

function useAutocompleteMultiSelect(
  label,
  onChange,
  functionRequestData,
) {
  const [selectedValue, setSelectedValue] = useState([
    ALL_ITEAM_MULTISELECT,
  ]);
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const renderTagsHandler = selectedValues => {
    const countSelected = selectedValues.length;

    if (countSelected >= MAX_COUNT_SELECTED_ITEMS) {
      return `Selected ${label} ${countSelected}`;
    }

    return selectedValues.map(({ name }) => name).join(',');
  };
  const onOpenHandler = () => {
    if (!autocompleteData.length) setIsLoading(true);
  };
  const renderOptionHandler = ({ id, name }, { selected }) => (
    <>
      <Checkbox
        indeterminate={id === ALL_ITEAM_MULTISELECT.id}
        value={id}
        checked={selected}
      />
      {name}
    </>
  );
  const onChangeHandler = (event, selectedValues) => {
    const indexAllItem = selectedValues.findIndex(
      ({ id }) => id === ALL_ITEAM_MULTISELECT.id,
    );
    const hasAll = indexAllItem > -1;
    const isSelectedAll = hasAll && indexAllItem !== 0;
    const isValueMoreThenOne = selectedValues.length > 1;

    if (isSelectedAll || !isValueMoreThenOne) {
      setSelectedValue([ALL_ITEAM_MULTISELECT]);
      onChange([]);
      return;
    }

    if (hasAll && isValueMoreThenOne) {
      selectedValues.splice(indexAllItem, 1);
    }

    onChange(selectedValues);
    setSelectedValue(selectedValues);
  };

  useEffect(() => {
    const loadData = async () => {
      const { data } = await functionRequestData();
      const response = data.response ? data.response : data;
      response.unshift(ALL_ITEAM_MULTISELECT);
      setAutocompleteData(response);
      setIsLoading(false);
    };
    if (isLoading && !autocompleteData.length) {
      loadData();
    }
  }, [functionRequestData, isLoading, autocompleteData.length]);

  return {
    isLoading,
    selectedValue,
    autocompleteData,
    onOpenHandler,
    renderTagsHandler,
    onChangeHandler,
    renderOptionHandler,
  };
}

export default useAutocompleteMultiSelect;
