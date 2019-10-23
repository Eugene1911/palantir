import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ButtonWithLoading from 'sharedComponents/ButtonWithLoading';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { DATE_MAIN_FORMAT } from 'config/constants';
import useCurrencyExchangeForm from './services/useCurrencyExchangeForm';

const CurrencyExchangeForm = ({ CurrencyExchangeStore }) => {
  const {
    isPending,
    onSubmit,
    handleDateChange,
    handleAmountChange,
    rate,
    amountInEuro,
    values,
  } = useCurrencyExchangeForm(CurrencyExchangeStore);

  return (
    <Container maxWidth="xs" style={{ padding: 0 }}>
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="standard-name"
              label="Amount USD"
              value={values.amount}
              onChange={handleAmountChange}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date"
                  format={DATE_MAIN_FORMAT}
                  value={values.exchangeRateDate}
                  onChange={handleDateChange}
                  fullWidth
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Box>
          </Grid>
        </Grid>
        <Paper>
          <Box p={3} mb={2}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Typography color="textSecondary">Rate</Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography>{rate}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Typography color="textSecondary">
                  Amount in EUR
                </Typography>
              </Grid>
              <Grid item xs={6} sm={8}>
                <Typography>{amountInEuro}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <Grid container direction="row" justify="flex-end">
          <ButtonWithLoading pending={isPending} onClick={onSubmit} />
        </Grid>
      </form>
    </Container>
  );
};

CurrencyExchangeForm.propTypes = {
  CurrencyExchangeStore: PropTypes.exact({
    amountInEuro: PropTypes.string,
    currencyExchangeState: PropTypes.string,
    exchange: PropTypes.func,
    rate: PropTypes.number,
  }).isRequired,
};

export default inject('CurrencyExchangeStore')(
  observer(CurrencyExchangeForm),
);
