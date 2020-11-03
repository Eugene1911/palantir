export enum ETrafficType {
  RON,
  PRIME,
  MEMBERS_AREA,
}

export const trafficTypes = {
  [ETrafficType.RON]: {
    title: 'RON',
    text: 'Run all spots of network.',
  },
  [ETrafficType.PRIME]: {
    title: 'PRIME',
    text: 'White list of best spots from our direct inventory.',
  },
  [ETrafficType.MEMBERS_AREA]: {
    title: 'MEMBERS AREA',
    text: 'White list of spots with advanced traffic.',
  },
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
