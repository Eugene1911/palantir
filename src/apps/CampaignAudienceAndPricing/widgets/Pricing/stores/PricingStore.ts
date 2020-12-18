import { flow, Instance, types } from 'mobx-state-tree';
import FilterSideStore from 'sharedWidgets/FilterSide/store/FilterSideStore';
import { getMinimalBids } from 'resources/api';
import {
  EAdModel,
  EBidType,
  EDistribution,
  EPriceType,
} from '../assets/constants/commonPricingTypes';
import {
  EFetchStatus,
  IPricingResultData,
} from '../../../assets/commonTypes';
import { resultPricingModel } from '../assets/constants/resultConst';

export const InitialPricingModel = {
  adModel: EAdModel.CPM,
  distribution: EDistribution.ASAP,
  rtb: {
    custom: false,
  },
  budget: {
    daily: '100',
    withTotal: false,
  },
  price: {
    priceType: EPriceType.STANDARD,
    bidType: EBidType.RECOMMENDED,
    fetchStatus: EFetchStatus.NOT_FETCHED,
  },
  filterSideStore: FilterSideStore.create({}),
};

const PricingModel = types
  .model({
    adModel: types.number,
    distribution: types.enumeration<EDistribution>(
      Object.values(EDistribution),
    ),
    rtb: types.model({
      custom: types.boolean,
      price: types.optional(types.string, ''),
    }),
    budget: types.model({
      daily: types.string,
      withTotal: types.boolean,
      total: types.optional(types.string, ''),
    }),
    price: types.model({
      priceType: types.enumeration<EPriceType>(
        Object.values(EPriceType),
      ),
      bid: types.optional(types.string, ''),
      bidType: types.enumeration<EBidType>(Object.values(EBidType)),
      [EBidType.MINIMUM]: types.optional(types.string, ''),
      [EBidType.TARGET]: types.optional(types.string, ''),
      [EBidType.RECOMMENDED]: types.optional(types.string, ''),
      fetchStatus: types.enumeration<EFetchStatus>(
        Object.values(EFetchStatus),
      ),
    }),
    filterSideStore: FilterSideStore,
  })
  .actions(self => ({
    setAdModel(adModel: EAdModel) {
      self.adModel = adModel;
    },
    setDistribution(distribution: EDistribution) {
      self.distribution = distribution;
    },
    toggleRtbCustom() {
      self.rtb.custom = !self.rtb.custom;
    },
    setRtbPrice(price: string) {
      self.rtb.price = price;
    },
    setBudget(budget: string, isDaily: boolean) {
      isDaily
        ? (self.budget.daily = budget)
        : (self.budget.total = budget);
    },
    toggleBudgetWithTotal() {
      self.budget.withTotal = !self.budget.withTotal;
    },
    setPriceType(type: EPriceType) {
      self.price.priceType = type;
    },
    setBidType(type: EBidType) {
      self.price.bidType = type;
      self.price.bid = self.price[type];
    },
    setBid(bid: string) {
      self.price.bid = bid;
    },
    getPricingResultData(): IPricingResultData {
      const result = {
        /* eslint-disable @typescript-eslint/camelcase */
        pricing_model: resultPricingModel[self.adModel],
        price: Number(self.price.bid),
        dynamic: self.price.priceType === EPriceType.DYNAMIC,
        price_rtb:
          self.rtb.price.length > 0 ? Number(self.rtb.price) : null,
        max_daily: Number(self.budget.daily),
        // max_total: self.budget.total
        //   ? Number(self.budget.total)
        //   : null,
        /* eslint-enable @typescript-eslint/camelcase */
      };

      return result;
    },
    setPricingData(data: IPricingResultData) {
      /* eslint-disable @typescript-eslint/camelcase */
      const {
        max_daily,
        price_rtb,
        dynamic,
        price,
        pricing_model,
      } = data;

      console.log('pricing data', {
        max_daily,
        price_rtb,
        dynamic,
        price,
        pricing_model,
      });

      self.adModel = resultPricingModel[pricing_model];
      price && (self.price.bid = String(price));
      self.price.priceType = dynamic
        ? EPriceType.DYNAMIC
        : EPriceType.STANDARD;
      price_rtb
        ? (self.rtb.price = String(price_rtb))
        : (self.rtb.price = '');
      max_daily
        ? (self.budget.daily = String(max_daily))
        : (self.budget.daily = InitialPricingModel.budget.daily);
      // TODO: Добавить budget.total когда будет в апи
      /* eslint-enable @typescript-eslint/camelcase */
    },
    // запросы
    getBidsPrice: flow(function* getBidsPrice() {
      try {
        self.price.fetchStatus = EFetchStatus.PENDING;
        const { data } = yield getMinimalBids({
          /* eslint-disable @typescript-eslint/camelcase */
          ad_format: 63,
          pricing_model: self.adModel,
          traffic_source_type: 'all',
          traffic_type: 'ron',
          stretch_time: self.distribution === EDistribution.EVEN,
          /* eslint-enable @typescript-eslint/camelcase */
        });
        // console.log('bids', data);

        self.price[EBidType.MINIMUM] = String(data.min);
        self.price[EBidType.TARGET] = String(data.max);
        self.price[EBidType.RECOMMENDED] = String(data.recommended);
        !self.price.bid &&
          (self.price.bid = String(data.recommended));
        self.price.fetchStatus = EFetchStatus.SUCCESS;
      } catch (error) {
        self.price.fetchStatus = EFetchStatus.ERROR;
        // tslint:disable-next-line:no-console
        console.log('error', error);
      }
    }),
  }));

export type TPricingModel = Instance<typeof PricingModel>;

export default PricingModel;
