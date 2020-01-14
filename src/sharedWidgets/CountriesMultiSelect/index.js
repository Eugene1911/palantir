import React from 'react';
import PropTypes from 'prop-types';
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
import { MAX_COUNT_SELECTED_ITEMS } from 'config/constants';
import ProgressLoaderMultiSelect from 'sharedComponents/ProgressLoaderMultiSelect';
import useCountriesMultiSelect from './services/useCountriesMultiSelect';
import useStyles from './styles';

function CountriesMultiSelect({ onChange, selectedCountries }) {
  const classes = useStyles();
  const {
    onChangeFilterTextHandler,
    onChangeSelectHandler,
    onSelectTierHandler,
    selectedCountriesIds,
    countriesList,
    isProgress,
    searchText,
    setLoading,
    tiersList,
  } = useCountriesMultiSelect(onChange, selectedCountries);

  return (
    <FormControl fullWidth>
      <InputLabel shrink htmlFor="countries">
        Countries
      </InputLabel>
      <Select
        displayEmpty
        name="countries"
        multiple
        onOpen={() => setLoading(true)}
        onChange={onChangeSelectHandler}
        renderValue={selected => {
          if (!selected || !selected.length)
            return <Typography noWrap>All</Typography>;

          const selectedLength = selected.length;

          if (selectedLength > MAX_COUNT_SELECTED_ITEMS) {
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
            value={searchText}
            onKeyDown={event => event.stopPropagation()}
            onChange={onChangeFilterTextHandler}
            InputProps={{
              endAdornment: (
                <ProgressLoaderMultiSelect isLoading={isProgress} />
              ),
            }}
          />
          <ButtonGroup size="small" fullWidth variant="contained">
            {tiersList.map(({ name, value }) => (
              <Button
                key={value}
                onClick={event => onSelectTierHandler(event, value)}
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

CountriesMultiSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedCountries: PropTypes.array,
};

CountriesMultiSelect.defaultProps = {
  selectedCountries: [],
};

export default CountriesMultiSelect;
