export const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;
export const API_VERSION_1 = '/v1/';
export const API_VERSION_1_1 = '/v1.1/';

export const AUTH_TOKEN = `${API_DOMAIN}${API_VERSION_1}auth/token`;
export const CAMPAIGNS = `${API_VERSION_1_1}campaigns`;
export const CAMPAIGNS_CLONE = `${API_VERSION_1_1}campaigns/{id}/clone`;
export const CAMPAIGNS_SAVE_AS = `${API_VERSION_1_1}campaigns/{id}/save_as`;
export const CAMPAIGNS_ARCHIVE = `${API_VERSION_1_1}campaigns/archive`;
export const CAMPAIGNS_REJECT_REASONS = `${API_VERSION_1_1}campaigns/reject_reasons`;
export const CAMPAIGNS_DISAPPROVE = `${API_VERSION_1_1}campaigns/{id}/disapprove`;
export const GROUPS = `${API_VERSION_1_1}campaign-group`;
export const UPDATE_GROUP = id =>
  `${API_VERSION_1_1}campaign-group/${id}`;
export const FORMATS = `${API_VERSION_1_1}formats`;
export const DEVICES = `${API_VERSION_1_1}devices`;
export const DEVICE_BRANDS = `${API_VERSION_1_1}device_brands`;
export const DEVICE_MODELS = `${API_VERSION_1_1}device_models`;
export const OS = `${API_VERSION_1_1}os`;
export const OS_VERSIONS = `${API_VERSION_1_1}os_versions`;
export const BROWSERS = `${API_VERSION_1_1}browsers`;
export const BROWSERS_VERSIONS = `${API_VERSION_1_1}browser_versions`;
export const MINIMAL_BIDS = `${API_VERSION_1_1}minimal-bids/price`;
export const SPOT_PRICE = `${API_VERSION_1_1}campaigns/{id}/spot/{spotId}/price`;
export const CARRIERS = `${API_VERSION_1_1}carriers`;
export const USERS = `${API_VERSION_1_1}users`;
export const APPLICATIONS = `${API_VERSION_1_1}applications`;
export const TOOLS_CURRENCY_EXCHANGE = `${API_VERSION_1_1}tools/currency_exchange`;
export const TOOLS_URL_UNPACK = `${API_VERSION_1_1}tools/url-unpack`;
export const COUNTRIES = `${API_VERSION_1_1}geo/countries`;
export const REGION = code =>
  `${API_VERSION_1_1}geo/regions?country=${code}`;
export const SPOTS = `${API_VERSION_1_1}spots`;
export const CATEGORIES = `${API_VERSION_1_1}categories`;
export const LANGUAGES = `${API_VERSION_1_1}languages`;
export const OPTIMIZER_STRATEGIES = `${API_VERSION_1_1}optimizer/strategies`;
export const OPTIMIZER_VARIABLES = `${API_VERSION_1_1}optimizer/variables`;

// Stats
export const PUBLISHER_CUSTOM_REPORT = `${API_VERSION_1_1}publisher/custom/report/by-`;

// Access Control
export const RBAC_CHECK_ACCESS = `${API_VERSION_1_1}rbac/check_access`;

// Save campaigns as draft
export const CAMPAIGN_DRAFT = `${API_VERSION_1_1}campaigns/draft`;
export const CAMPAIGN_EDIT_DRAFT = id =>
  `${API_VERSION_1_1}campaigns/${id}/draft`;

// Batch
export const BATCH = `${API_VERSION_1_1}batch`;
