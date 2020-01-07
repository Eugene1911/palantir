import { useState, useEffect, useMemo } from 'react';
import { getCountries } from 'resources/api';

const tiersList = [
  {
    name: 'tier 1',
    value: 1,
  },
  {
    name: 'tier 2',
    value: 2,
  },
  {
    name: 'tier 3',
    value: 3,
  },
];

function useCountriesMultiSelect(onChange, selectedCountries) {
  const [isProgress, setIsProgress] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountriesIds, setSelectedCountriesIds] = useState([
    ...selectedCountries,
  ]);
  const onSelectTierHandler = (event, value) => {
    const selectedTiers = countriesList
      .filter(({ tier }) => tier === value)
      .map(({ code }) => code);

    event.stopPropagation();

    setSelectedCountriesIds(selectedTiers);
  };
  const onChangeFilterTextHandler = ({ target }) => {
    const { value } = target;
    setSearchText(value);
  };
  const onChangeSelectHandler = event => {
    const { target } = event;
    const { value } = target;
    const isAll = value.includes('all');

    if (isAll) {
      setSelectedCountriesIds([]);
    } else {
      setSelectedCountriesIds(value);
    }
  };

  useMemo(() => {
    onChange(selectedCountriesIds);
  }, [onChange, selectedCountriesIds]);

  useEffect(() => {
    const loadCountries = async () => {
      const { data } = await getCountries();
      setCountriesList(data);
      setIsProgress(false);
    };
    if (
      (isLoading && !countriesList.length) ||
      (!countriesList.length && selectedCountriesIds.length)
    )
      loadCountries();
  }, [countriesList.length, isLoading, selectedCountriesIds.length]);

  return {
    onChangeFilterTextHandler,
    onChangeSelectHandler,
    onSelectTierHandler,
    selectedCountriesIds,
    countriesList,
    isProgress,
    searchText,
    setLoading,
    tiersList,
  };
}

export default useCountriesMultiSelect;
