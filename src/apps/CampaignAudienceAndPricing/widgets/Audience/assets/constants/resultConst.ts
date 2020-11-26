import { ETrafficSource, ETrafficType } from './commonAudienceTypes';

export const resultTrafficType = {
  [ETrafficType.RON]: 'ron',
  [ETrafficType.PRIME]: 'prime',
  [ETrafficType.MEMBERS_AREA]: 'members_area',
};

export const resultTrafficSourceType = {
  [ETrafficSource.ALL]: 'all',
  [ETrafficSource.DIRECT_INVENTORY]: 'direct',
  [ETrafficSource.PARTNER_NETWORKS]: 'partner',
};
