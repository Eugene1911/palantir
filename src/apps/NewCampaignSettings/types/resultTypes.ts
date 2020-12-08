import { ProxyTrafficTypes } from 'sharedTypes';

export interface ISettingsResultData {
  name: string;
  group_id?: number;
  format_id: number;
  categories?: number[];
}

export interface ISchedulingResultData {
  hours_targeting: string;
  schedule_timezone: number;
  schedule_start_time?: string;
  schedule_end_time?: string;
}

export interface ITargetingResultData {
  countries: string[];
  geo_targets: string[];
  languages: number[];
  devices: number[];
  device_brands: number[];
  device_models: number[];
  device_release_date_offset?: number;
  device_price_on_release_from?: number;
  device_price_on_release_to?: number;
  oses: number[];
  os_versions: number[];
  browsers: number[];
  browser_versions: number[];
  carriers: number[];
  network_traffic_type: ProxyTrafficTypes;
  ip_range?: string;
  exclude_ip_range?: string;
  keywords: string[];
}

export interface ISpecialResultData {
  exclusive: boolean;
  allow_setting_any_price: boolean;
  backup: boolean;
  weight: number;
  flat_rate?: number;
  flat_rate_amount?: number;
  adblock?: boolean;
  private_browsing?: boolean;
  flash?: boolean;
}

export interface INewCampaignSettingsResultData
  extends ISettingsResultData,
    ISchedulingResultData,
    ISpecialResultData,
    ITargetingResultData {
  pricing_model: 'cpm'; // TODO это для второго шага, потом убрать
  max_daily: 15; // TODO это для второго шага, потом убрать
}
