import React, { useEffect } from 'react';
import { format } from 'date-fns';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import {
  CURRENCY_EXCHANGE_DATE_FORMAT,
  LOAD_STATES,
} from 'config/constants';
import { leaveOnlyNumbers } from 'helpers/stringFormat';
import { initCurrencyExchangeStore } from '../../../stores/CurrencyExchangeStore';

function useCurrencyExchangeForm(CurrencyExchangeStore) {
  const { amount, exchangeRateDate } = initCurrencyExchangeStore;
  const {
    rate,
    amountInEuro,
    exchange,
    currencyExchangeState,
  } = CurrencyExchangeStore;

  const infoNotification = useHookInfoNotification();
  const isPending = currencyExchangeState === LOAD_STATES.PENDING;

  const [values, setValue] = React.useState({
    amount,
    exchangeRateDate,
  });

  const handleAmountChange = event => {
    const { value } = event.target;
    setValue({
      ...values,
      amount: leaveOnlyNumbers(value),
    });
  };

  const handleDateChange = selectedDate => {
    setValue({
      ...values,
      exchangeRateDate: selectedDate,
    });
  };

  const onSubmit = () => {
    const params = {
      date: format(
        values.exchangeRateDate,
        CURRENCY_EXCHANGE_DATE_FORMAT,
      ),
      usd: values.amount,
    };
    exchange(params);
  };

  useEffect(() => {
    if (currencyExchangeState === LOAD_STATES.ERROR) {
      infoNotification({
        variant: 'error',
        message: 'Something went wrong',
      });
    }
  });

  return {
    isPending,
    onSubmit,
    handleDateChange,
    handleAmountChange,
    rate,
    amountInEuro,
    values,
  };
}

export default useCurrencyExchangeForm;
