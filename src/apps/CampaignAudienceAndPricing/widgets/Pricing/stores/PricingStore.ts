import { Instance, types } from 'mobx-state-tree';
import FilterSideStore from 'sharedWidgets/FilterSide/store/FilterSideStore';
import {
  EAdModel,
  EBidType,
  EDistribution,
  EPriceType,
} from '../assets/constants/commonPricingTypes';

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
    },
    setBid(bid: string) {
      self.price.bid = bid;
    },
  }));

export type TPricingModel = Instance<typeof PricingModel>;

export default PricingModel;
