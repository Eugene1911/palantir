import { EAdModel } from './commonPricingTypes';

export const resultPricingModel = {
  [EAdModel.CPM]: 'cpm',
  [EAdModel.CPC]: 'cpc',
  [EAdModel.CPA]: 'cpa',
  cpm: EAdModel.CPM,
  cpc: EAdModel.CPC,
  cpa: EAdModel.CPA,
};
