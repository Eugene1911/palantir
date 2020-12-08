import { ProxyTrafficTypes } from './index';

export interface IFullCampaignType {
  id: number;

  // 1 Step Settings
  name: string;
  group_id?: number;
  format_id: number;
  categories: number[];

  // 1 Step Scheduling
  hours_targeting: string;
  schedule_timezone: number;
  schedule_start_time: Date;
  schedule_end_time: Date;

  // 1 Step Targeting
  countries: string[];
  geo_targets: string[];
  languages: number[];
  devices: number[];
  device_brands: number[];
  device_models: number[];
  device_release_date_offset: number | null;
  device_price_on_release_from: number | null;
  device_price_on_release_to: number | null;
  browsers: number[];
  browser_versions: number[];
  oses: number[];
  os_versions: number[];
  carriers: number[];
  network_traffic_type: ProxyTrafficTypes;
  ip_range: string;
  exclude_ip_range: string;
  keywords: string[];

  // 1 Step Special
  exclusive: boolean;
  allow_setting_any_price: boolean;
  backup: boolean;
  weight: number;
  flat_rate: number | null;
  flat_rate_amount: number | null;
  adblock: boolean | null;
  private_browsing: boolean | null;
  flash: boolean | null;

  compromised: boolean;
  disabled_subids: string[];
  ecpm: number;
  enabled_subids: string[];
  exclude_spots: number[];
  is_backup: boolean;
  is_exclusive: boolean;
  is_zombie: boolean;
  max_daily: number;
  max_daily_impressions: number;
  price: number;
  callback_url: string;
  price_rtb: number;
  disable_rtb: boolean;
  pricing_model: string;
  reject_comment: string;
  reject_reason: string | null;
  spent_today: number;
  status: string;
  approved: string;
  active: true;
  stretch_time: boolean;
  timezone: number;
  type: string;
  user_id: number;
  is_prime: boolean;
  traffic_type: string;
  traffic_source_type: string;
  adspots: string[];
  spots: number[];
  created_at: string;
  updated_at: string;
  dynamic: false;
  user: { id: number; email: string };
  push_format_option: string;
  no_funds: boolean;
  is_archived: boolean;
  is_traced: boolean;
}
