import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  CURRENCY_EXCHANGE_DATE_FORMAT,
  DATE_MAIN_FORMAT,
} from 'config/constants';

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 400,
    margin: '0 auto',
  },
  datePicker: {
    marginBottom: 20,
  },
  paper: {
    padding: 20,
    marginBottom: 20,
  },
  circular: {
    marginRight: 5,
  },
}));

const ToolsForm = ({ CurrencyExchangeStore }) => {
  const {
    rate,
    amountInEuro,
    loading,
    exchange,
  } = CurrencyExchangeStore;
  const classes = useStyles();
  const [date, setDate] = React.useState(new Date());
  const [amount, setAmount] = React.useState(0);
  const infoNotification = useHookInfoNotification();
  const viewAmount = amountInEuro ? amountInEuro.toFixed(2) : 0;

  const handleAmountChange = event => {
    const { value } = event.target;
    setAmount(value.replace(/[^\d]/g, ''));
  };

  const handleDateChange = selectedDate => {
    setDate(selectedDate);
  };

  const onSubmit = () => {
    const params = {
      date: format(date, CURRENCY_EXCHANGE_DATE_FORMAT),
      usd: amount,
    };
    exchange(params, infoNotification);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="standard-name"
            label="Amount USD"
            value={amount}
            onChange={handleAmountChange}
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.datePicker}
              margin="normal"
              id="date-picker-dialog"
              label="Date"
              format={DATE_MAIN_FORMAT}
              value={date}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
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
            <Typography>{viewAmount}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Grid container direction="row" justify="flex-end">
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          {loading && (
            <CircularProgress
              color="inherit"
              size={20}
              className={classes.circular}
            />
          )}
          Exchange
        </Button>
      </Grid>
    </form>
  );
};

ToolsForm.propTypes = {
  CurrencyExchangeStore: PropTypes.shape({
    amountInEuro: PropTypes.number,
    exchange: PropTypes.func,
    loading: PropTypes.bool,
    rate: PropTypes.number,
  }),
};

ToolsForm.defaultProps = {
  CurrencyExchangeStore: {},
};

export default inject('CurrencyExchangeStore')(observer(ToolsForm));
