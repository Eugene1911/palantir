import { ETrafficSource, ETrafficType } from './commonAudienceTypes';

export const radioTitles = {
  whitelist: 'WHITELIST',
  blacklist: 'BLACKLIST',
  [ETrafficSource.ALL]: 'ALL',
  [ETrafficSource.PARTNER_NETWORKS]: 'PARTNER NETWORKS',
  [ETrafficSource.DIRECT_INVENTORY]: 'DIRECT INVENTORY',
  yes: 'YES',
  no: 'NO',
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

export const advanced = 'Advanced';

export const disabledTagToolTip = (isSpot: boolean) =>
  `We do not have such a ${
    isSpot ? 'spot' : 'site'
  } ID \nIt will not have traffic.`;
