export const API_DOMAIN = '//api.staging.trafficstars.com';
export const API_VERSION_1 = '/v1/';
export const API_VERSION_1_1 = '/v1.1/';

export const AUTH_TOKEN = `${API_DOMAIN}${API_VERSION_1}auth/token`;
export const CAMPAIGNS = `${API_VERSION_1_1}campaigns`;
export const CAMPAIGNS_CLONE = `${API_VERSION_1_1}campaigns/{id}/clone`;
export const CAMPAIGNS_SAVE_AS = `${API_VERSION_1_1}campaigns/{id}/save_as`;
export const CAMPAIGNS_ARCHIVE = `${API_VERSION_1_1}campaigns/archive`;
export const CAMPAIGNS_REJECT_REASONS = `${API_VERSION_1_1}campaigns/reject_reasons`;
export const CAMPAIGNS_DISAPPROVE = `${API_VERSION_1_1}campaigns/{id}/disapprove`;
export const FORMATS = `${API_VERSION_1_1}formats`;
