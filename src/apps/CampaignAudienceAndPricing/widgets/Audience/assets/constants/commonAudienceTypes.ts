export enum ETrafficType {
  RON,
  PRIME,
  MEMBERS_AREA,
}

export const trafficTypes = {
  [ETrafficType.RON]: 'RON',
  [ETrafficType.PRIME]: 'Prime',
  [ETrafficType.MEMBERS_AREA]: 'Members area',
};

export enum EListType {
  WHITE,
  BLACK,
}

export enum ETagStatus {
  DISABLED = 'disabled',
  ACTIVE = 'active',
}

export enum EIDModel {
  SITE_ID = 'siteID',
  SPOT_ID = 'spotID',
  SUB_ID = 'subID',
}

export enum ETrafficSource {
  ALL = 'all',
  DIRECT_INVENTORY = 'direct inventory',
  PARTNER_NETWORKS = 'partner networks',
}

export const trafficSources = {
  [ETrafficSource.ALL]: 'All traffic',
  [ETrafficSource.DIRECT_INVENTORY]: 'Direct inventory',
  [ETrafficSource.PARTNER_NETWORKS]: 'Partner networks',
};

export const accordionTitle = 'Audience';
