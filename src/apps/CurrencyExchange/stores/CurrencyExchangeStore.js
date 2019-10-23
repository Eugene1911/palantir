import { types, flow } from 'mobx-state-tree';
import { toolsCurrencyExchange } from 'resources/api';
import { LOAD_STATES } from 'config/constants';
import { numberToFixed } from '../../../helpers/numberFormat';

const today = new Date();
const initCurrencyExchangeStore = {
  amount: 0,
  exchangeRateDate: today,
  rate: 0,
  amountInEuro: '0',
  currencyExchangeState: LOAD_STATES.DONE,
};
const {
  rate: initRate,
  amountInEuro: initAmountInEuro,
  currencyExchangeState: initCurrencyExchangeState,
} = initCurrencyExchangeStore;

export default types
  .model('CurrencyExchangeStore', {
    rate: types.optional(types.number, initRate),
    amountInEuro: types.optional(types.string, initAmountInEuro),
    currencyExchangeState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      initCurrencyExchangeState,
    ),
  })
  .actions(self => ({
    exchange: flow(function* exchange(params) {
      self.currencyExchangeState = LOAD_STATES.PENDING;
      try {
        const {
          data: { rate, converted_in_eur },
        } = yield toolsCurrencyExchange(params);
        self.rate = rate;
        self.amountInEuro = numberToFixed(converted_in_eur, 2);
        self.currencyExchangeState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('Failed to exchange currency', error);
        self.currencyExchangeState = LOAD_STATES.ERROR;
      }
    }),
  }));

export { initCurrencyExchangeStore };
