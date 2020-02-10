import React, { useState, useEffect, useRef } from 'react';
import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';
import clone from 'lodash/clone';
import Checkbox from '@material-ui/core/Checkbox';
import { getSpots } from 'resources/api';
import {
  MAX_COUNT_SELECTED_ITEMS,
  ALL_ITEAM_MULTISELECT,
} from 'config/constants';

function useSpotsAutocompleteMultiSelect(
  label,
  onChange,
  spotsIds,
  applicationsIds,
) {
  const [isOpen, setIsOpen] = useState(false);
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
  const onOpenCloseHandler = isOpenEvent => {
    const indexAllItem = selectedValue.findIndex(
      ({ id }) => id === ALL_ITEAM_MULTISELECT.id,
    );
    const countSelected = selectedValue.length;
    const isSelectedAll = indexAllItem !== -1;

    if (isSelectedAll && isOpenEvent) {
      setSelectedValue([]);
    } else if (!countSelected && !isOpenEvent) {
      setSelectedValue([ALL_ITEAM_MULTISELECT]);
    }
    setIsOpen(isOpenEvent);
  };
  const renderOptionHandler = ({ id, name }, { selected }) => (
    <>
      <Checkbox
        indeterminate={id === ALL_ITEAM_MULTISELECT.id}
        // value={id}
        checked={selected}
        // checked={spotsIds.includes(id)}
      />
      {name}
    </>
  );
  const onChangeHandler = (event, selectedValues) => {
    const indexAllItem = selectedValues.findIndex(
      ({ id }) => id === ALL_ITEAM_MULTISELECT.id,
    );
    const isSelectedAll = indexAllItem !== -1;

    if (isSelectedAll) {
      setSelectedValue([ALL_ITEAM_MULTISELECT]);
      setIsOpen(false);
      onChange([]);
      return;
    }

    onChange(selectedValues);
    setSelectedValue(selectedValues);
  };
  const lastApplicationsIds = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await getSpots({
        app_id: applicationsIds,
      });
      const { response } = data;
      const sortSpotsList = sortBy(
        response,
        ({ application }) => application.id,
      );
      const selectedSpots = sortSpotsList.filter(({ id }) =>
        spotsIds.includes(id),
      );
      setSelectedValue(selectedSpots);
      onChange(selectedSpots);
      lastApplicationsIds.current = clone(applicationsIds);
      sortSpotsList.unshift(ALL_ITEAM_MULTISELECT);
      setAutocompleteData(sortSpotsList);
      setIsLoading(false);
    };
    const isEqualLastAppIds = isEqual(
      lastApplicationsIds.current,
      applicationsIds,
    );

    if (applicationsIds.length && !isEqualLastAppIds) {
      setIsLoading(true);
      loadData();
    } else if (!applicationsIds.length) {
      setAutocompleteData([ALL_ITEAM_MULTISELECT]);
      onChange([]);
    }
  }, [applicationsIds, onChange, spotsIds]);

  useEffect(() => {
    console.log('useEffect SPOTS ----->', spotsIds);
  }, [spotsIds]);

  return {
    isOpen,
    isLoading,
    selectedValue,
    autocompleteData,
    onOpenCloseHandler,
    renderTagsHandler,
    onChangeHandler,
    renderOptionHandler,
  };
}

export default useSpotsAutocompleteMultiSelect;
