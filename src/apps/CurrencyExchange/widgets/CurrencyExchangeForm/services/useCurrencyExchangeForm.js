import { useEffect, useState } from 'react';
import format from 'date-fns/format';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import {
  CURRENCY_EXCHANGE_DATE_FORMAT,
  REGEXP_AMOUNT,
  LOAD_STATES,
} from 'config/constants';
import { useTranslation } from 'react-i18next';

function useCurrencyExchangeForm(CurrencyExchangeStore) {
  const { t } = useTranslation();
  const {
    currencyExchangeFormData: {
      rate,
      amountInEuro,
      amount,
      exchangeRateDate,
    },
    exchange,
    currencyExchangeState,
  } = CurrencyExchangeStore;
  const infoNotification = useHookInfoNotification();
  const isPending = currencyExchangeState === LOAD_STATES.PENDING;
  const [formValues, setFormValue] = useState({
    amount,
    exchangeRateDate,
  });

  const handleAmountChange = event => {
    const { value } = event.target;
    const amountToSet = value.match(REGEXP_AMOUNT)
      ? value
      : formValues.amount;
    setFormValue({
      ...formValues,
      amount: amountToSet,
    });
  };

  const handleDateChange = selectedDate => {
    setFormValue({
      ...formValues,
      exchangeRateDate: selectedDate,
    });
  };

  const onSubmit = () => {
    const params = {
      date: format(
        formValues.exchangeRateDate,
        CURRENCY_EXCHANGE_DATE_FORMAT,
      ),
      usd: formValues.amount,
    };
    exchange(params);
  };

  useEffect(() => {
    if (currencyExchangeState === LOAD_STATES.ERROR) {
      infoNotification({
        variant: 'error',
        message: t(
          'currency_exchange:notification.something_went_wrong',
        ),
      });
    }
  }, [currencyExchangeState, infoNotification, t]);

  return {
    isPending,
    onSubmit,
    handleDateChange,
    handleAmountChange,
    rate,
    amountInEuro,
    formValues,
    t,
  };
}

export default useCurrencyExchangeForm;
