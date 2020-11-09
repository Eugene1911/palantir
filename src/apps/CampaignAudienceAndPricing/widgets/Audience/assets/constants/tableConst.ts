import { EIDModel } from './commonAudienceTypes';

export const titles = {
  [EIDModel.SITE_ID]: 'Chosen Sites',
  [EIDModel.SPOT_ID]: 'Chosen Spots',
  [EIDModel.SUB_ID]: 'Chosen Subs IDs',
};

export const columns = {
  siteID: 'Site id',
  domain: 'Site domain',
  spotID: 'Spot id',
  adZone: 'Ad Zone',
  avg: 'Avg Impressions',
  bid: 'Bid',
};

export const chosen = 'Chosen';

export const subIdInputLabel = 'Sub IDs';

export const searchPlaceholder = {
  [EIDModel.SPOT_ID]: 'Search by site id, site domain and spot id',
  [EIDModel.SITE_ID]: 'Search by site id, site domain',
};
