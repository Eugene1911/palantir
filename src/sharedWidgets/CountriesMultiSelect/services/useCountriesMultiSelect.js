import { useState, useEffect, useMemo, useCallback } from 'react';
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
  const getSelectedCountriesValue = useCallback(
    values =>
      countriesList.filter(({ code }) => values.includes(code)),
    [countriesList],
  );
  const onSelectTierHandler = (event, value) => {
    const selectedTiers = countriesList.filter(
      ({ tier }) => tier === value,
    );

    event.stopPropagation();

    onChange(
      selectedTiers.map(({ code }) => code),
      selectedTiers,
    );
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
      onChange([], []);
    } else if (value) {
      onChange(value, getSelectedCountriesValue(value));
    }
  };

  useMemo(() => {
    onChange(null, getSelectedCountriesValue(selectedCountries));
  }, [getSelectedCountriesValue, onChange, selectedCountries]);

  useEffect(() => {
    const loadCountries = async () => {
      const { data } = await getCountries();
      setCountriesList(data);
      setIsProgress(false);
    };
    if (
      (isLoading && !countriesList.length) ||
      (!countriesList.length && selectedCountries.length)
    )
      loadCountries();
  }, [
    countriesList.length,
    getSelectedCountriesValue,
    isLoading,
    onChange,
    selectedCountries,
    selectedCountries.length,
  ]);

  return {
    onChangeFilterTextHandler,
    onChangeSelectHandler,
    onSelectTierHandler,
    countriesList,
    isProgress,
    searchText,
    setLoading,
    tiersList,
  };
}

export default useCountriesMultiSelect;
