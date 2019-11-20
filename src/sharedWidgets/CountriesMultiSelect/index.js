import React, { useState, useEffect, useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import { getCountries } from 'resources/api';
import useStyles from './styles';

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
function CountriesMultiSelect() {
  const classes = useStyles();
  const [selectTier, setSelectTier] = useState(null);
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountriesIds, setSelectedCountriesIds] = useState(
    [],
  );
  const onSelectTierHandler = value => {
    setSelectTier(value === selectTier ? null : value);
  };

  useMemo(() => {
    setSelectedCountriesIds(
      countriesList
        .filter(({ tier }) => tier === selectTier)
        .map(({ code }) => code),
    );
  }, [countriesList, selectTier]);

  useEffect(() => {
    const loadCountries = async () => {
      const { data } = await getCountries();
      setCountriesList(data);
    };
    loadCountries();
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel shrink htmlFor="countries">
        Countries
      </InputLabel>
      <Select
        displayEmpty
        name="countries"
        multiple
        onChange={({ target }) => {
          const { value } = target;
          const isAll = value.includes('all');

          if (isAll) {
            setSelectedCountriesIds([]);
          } else {
            setSelectedCountriesIds(value);
          }
        }}
        renderValue={selected => {
          if (!selected || !selected.length)
            return <Typography noWrap>All</Typography>;

          const selectedLength = selected.length;

          if (selectedLength > 4) {
            return (
              <Typography noWrap>
                {`Selected countries: ${selectedLength}`}
              </Typography>
            );
          }

          const countriesSelectedList = countriesList
            .filter(({ code }) => selected.includes(code))
            .map(({ name }) => name)
            .join(', ');

          return (
            <Typography noWrap>{countriesSelectedList}</Typography>
          );
        }}
        value={selectedCountriesIds}
      >
        <div className={classes.content}>
          <TextField
            className={classes.search}
            autoFocus
            fullWidth
            label="Search"
            name="search_country"
            value=""
            onChange={() => {}}
          />
          <ButtonGroup
            size="small"
            fullWidth
            variant="contained"
            aria-label="small outlined button group"
          >
            {tiersList.map(({ name, value }) => (
              <Button
                color={selectTier === value ? 'primary' : ''}
                key={value}
                onClick={() => onSelectTierHandler(value)}
              >
                {name}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <MenuItem value="all">
          <Checkbox
            checked={!selectedCountriesIds.length}
            value="all"
            indeterminate
          />
          <ListItemText primary="All" />
        </MenuItem>
        {countriesList.map(({ code, name }) => (
          <MenuItem key={code} value={code}>
            <Checkbox checked={selectedCountriesIds.includes(code)} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CountriesMultiSelect;
