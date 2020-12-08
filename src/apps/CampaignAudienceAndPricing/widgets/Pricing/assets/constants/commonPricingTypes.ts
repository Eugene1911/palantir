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
  ASAP = 'ASAP',
  EVEN = 'EVEN',
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

export enum EBidStatus {
  OPTIMAL = 1,
  COVERED,
  LOW,
  ERROR,
}

export const accordionTitle = 'Pricing';
