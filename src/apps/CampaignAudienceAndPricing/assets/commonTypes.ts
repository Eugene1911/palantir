export enum EFetchStatus {
  NOT_FETCHED = 'not_fetched',
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const enterText = 'Enter';

export interface IAudienceResultData {
  traffic_type: 'string';
  spots: number[];
  exclude_spots: number[];
  enabled_applications: number[];
  disabled_applications: number[];
  enabled_subids: string[];
  disabled_subids: string[];
  traffic_source_type: string;
  disable_rtb: boolean;
}
export interface IPricingResultData {
  pricing_model: string;
  price: number;
  dynamic: boolean;
  price_rtb: number;
  max_daily: number;
}

export interface ICampaignAudienceAndPricingResultData
  extends IAudienceResultData,
    IPricingResultData {}
