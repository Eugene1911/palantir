import { types, flow } from 'mobx-state-tree';
import { currencyExchange } from 'resources/api';

export default types
  .model('CurrencyExchangeStore', {
    rate: types.optional(types.number, 0),
    amountInEuro: types.optional(types.number, 0),
    loading: false,
  })
  .actions(self => ({
    exchange: flow(function* exchange(params, infoNotification) {
      self.loading = true;
      try {
        const res = yield currencyExchange(params);
        const { rate, converted_in_eur } = res.data;
        self.rate = rate;
        self.amountInEuro = converted_in_eur;
      } catch (error) {
        console.error('Failed to exchange currency', error);
        infoNotification({
          variant: 'error',
          message: 'Something went wrong',
        });
      }
      self.loading = false;
    }),
  }));
