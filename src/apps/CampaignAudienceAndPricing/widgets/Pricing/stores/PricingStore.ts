import { Instance, types } from 'mobx-state-tree';
import {
  EAdModel,
  EDistribution,
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
  }));

export type TPricingModel = Instance<typeof PricingModel>;

export default PricingModel;
