import { types, flow } from 'mobx-state-tree';
import { toolsCurrencyExchange } from 'resources/api';
import { LOAD_STATES } from 'config/constants';
import { numberToFixed } from '../../../helpers/numberFormat';

const initCurrencyExchangeStore = {
  amount: 0,
  exchangeRateDate: new Date(),
  rate: 0,
  amountInEuro: '0',
};

export default types
  .model('CurrencyExchangeStore', {
    currencyExchangeFormData: types.optional(
      types.frozen(),
      initCurrencyExchangeStore,
    ),
    currencyExchangeState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
  })
  .actions(self => ({
    exchange: flow(function* exchange(params) {
      self.currencyExchangeState = LOAD_STATES.PENDING;
      try {
        const {
          data: { rate, converted_in_eur },
        } = yield toolsCurrencyExchange(params);

        self.setCurrencyExchangeFormData({
          rate,
          amountInEuro: numberToFixed(converted_in_eur, 2),
        });
        self.currencyExchangeState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('Failed to exchange currency', error);
        self.currencyExchangeState = LOAD_STATES.ERROR;
      }
    }),
    setCurrencyExchangeFormData(newParams) {
      self.currencyExchangeFormData = {
        ...self.currencyExchangeFormData,
        ...newParams,
      };
    },
  }));

export { initCurrencyExchangeStore };
