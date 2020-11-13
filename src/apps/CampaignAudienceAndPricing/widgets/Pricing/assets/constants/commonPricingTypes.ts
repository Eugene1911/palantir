export enum EAdModel {
  CPM,
  CPC,
  CPA,
}

export const adModels = {
  [EAdModel.CPM]: 'CPM',
  [EAdModel.CPC]: 'CPC',
  [EAdModel.CPA]: 'CPA',
};

export enum EDistribution {
  ASAP = 'asap',
  EVEN = 'even',
}

export enum EPriceType {
  STANDARD = 'standard',
  DYNAMIC = 'dynamic',
}

export enum EBidType {
  MINIMUM = 'minimum',
  TARGET = 'target',
  RECOMMENDED = 'recommended',
}

export const accordionTitle = 'Pricing';
