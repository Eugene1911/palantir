import transformRequestOptions from 'helpers/transformRequestOptions';
import requestParamsSerializer from 'helpers/requestParamsSerializer';
import {
  GROUPS,
  FORMATS,
  DEVICES,
  DEVICE_BRANDS,
  DEVICE_MODELS,
  OS,
  BROWSERS,
  CARRIERS,
  USERS,
  CATEGORIES,
  LANGUAGES,
  COUNTRIES,
  REGION,
  CAMPAIGNS,
  APPLICATIONS,
  CAMPAIGNS_CLONE,
  CAMPAIGNS_SAVE_AS,
  CAMPAIGNS_ARCHIVE,
  CAMPAIGNS_REJECT_REASONS,
  CAMPAIGNS_DISAPPROVE,
  TOOLS_CURRENCY_EXCHANGE,
  TOOLS_URL_UNPACK,
  PUBLISHER_CUSTOM_REPORT,
  SPOTS,
  OPTIMIZER_STRATEGIES,
  OPTIMIZER_VARIABLES,
  RBAC_CHECK_ACCESS,
  CAMPAIGN_DRAFT,
  BROWSERS_VERSIONS,
  OS_VERSIONS,
  MINIMAL_BIDS,
} from './services/APIEndpoints';
import API from './services/APIService';

/**
 * Get Ad Formats
 * @param {Object} params
 */
export const getFormats = params => API.get(FORMATS, { params });

/**
 * Get Campaigns groups
 * @param {Object} params
 */
export const getGroups = params => API.get(GROUPS, { params });

/**
 * Get Ad Devices
 * @param {Object} params
 */
export const getDevices = params => API.get(DEVICES, { params });

/**
 * Get Devices Brands
 * @param {Object} params
 */
export const getDevicesBrands = params =>
  API.get(DEVICE_BRANDS, { params });

/**
 * Get Devices Models
 * @param {Object} params
 */
export const getDevicesModels = params =>
  API.get(DEVICE_MODELS, { params });

/**
 * Get OSes
 * @param {Object} params
 */
export const getOSes = params => API.get(OS, { params });

/**
 * Get OSes versions
 * @param {Object} params
 */
export const getOSesVersions = params =>
  API.get(OS_VERSIONS, { params });

/**
 * Get Languages
 * @param {Object} params
 */
export const getLanguages = params => API.get(LANGUAGES, { params });

/**
 * Get Browsers
 * @param {Object} params
 */
export const getBrowsers = params => API.get(BROWSERS, { params });

/**
 * Get Browsers versions
 * @param {Object} params
 */
export const getBrowsersVersions = params =>
  API.get(BROWSERS_VERSIONS, { params });

/**
 * Get MinimalBids
 * @param {Object} params
 */
export const getMinimalBids = params =>
  API.post(MINIMAL_BIDS, params);

/**
 * Get Browsers
 * @param {Object} params
 */
export const getCarriers = params => API.get(CARRIERS, { params });

/**
 * Get Spots
 * @param {Object} params
 */
export const getSpots = params =>
  API.get(SPOTS, {
    params,
    paramsSerializer: requestParamsSerializer,
  });

/**
 * Get Users
 * @param {Object} params
 */
export const getUsers = params => API.get(USERS, { params });

/**
 * PATCH Users
 * @param {Object} params
 */
export const patchUsers = (id, params) =>
  API.patch(`${USERS}/${id}`, params);

/**
 * Get Applications
 * @param {Object} params
 */
export const getApplications = params =>
  API.get(APPLICATIONS, {
    params,
    paramsSerializer: requestParamsSerializer,
  });

/**
 * Get Countries
 * @param {Object} params
 */
export const getCountries = params => API.get(COUNTRIES, { params });

/**
 * Get Region by country code
 * @param {string} code
 */
export const getRegionByCountryCode = code => API.get(REGION(code));

/**
 * Publisher custom report
 * @param {String} groupType -[app, domain, browser, carrier, campaign, creative, etc]
 * @param {Object} params
 */
export const getPublisherCustomReport = (groupType, params) =>
  API.get(`${PUBLISHER_CUSTOM_REPORT}${groupType}`, {
    params,
    paramsSerializer: requestParamsSerializer,
  });

/**
 * Cutsom report group type
 */
export const GROUP_TYPES_CUSTOM_REPORTS = {
  app: 'app',
  domain: 'domain',
  browser: 'browser',
  carrier: 'carrier',
  campaign: 'campaign',
  creative: 'creative',
  country: 'country',
  day: 'day',
  hour: 'hour',
  device: 'device',
  format: 'format',
  language: 'language',
  os: 'os',
  rtbClient: 'rtb-client',
  spot: 'spot',
  category: 'category',
};

/**
 * Get compaigns
 * @param {Object} params
 */
export const getCampaigns = params =>
  API({
    url: CAMPAIGNS,
    method: 'GET',
    params,
    paramsSerializer: requestParams =>
      transformRequestOptions(requestParams),
  });

/**
 * Put campaign status
 * @param {number} id
 * @param {String} status
 */
export const putCampaignStatus = async (id, status) =>
  API.put(`${CAMPAIGNS}/${id}/${status}`);

/**
 * Get compaign by ID
 * @param {Object} params
 */
export const getCampaignById = campaignId =>
  API.get(`${CAMPAIGNS}/${campaignId}`);

/**
 * Campaign clone
 * @param {String} campaignId
 */
export const postCampaignClone = campaignId =>
  API.post(CAMPAIGNS_CLONE.replace('{id}', campaignId), {});

/**
 * Campaign save as
 * @param {String} campaignId
 */
export const postCampaignSaveAs = (campaignId, params) =>
  API.post(CAMPAIGNS_SAVE_AS.replace('{id}', campaignId), params);

/**
 * Campaign archive
 * @param {Object} params
 */
export const putCampaignArchive = params =>
  API.put(CAMPAIGNS_ARCHIVE, params);

/**
 * Get Campaign reject reasons
 * @param {Object} params
 */
export const getCampaignRejectReasons = () =>
  API.get(CAMPAIGNS_REJECT_REASONS);

/**
 * Get Campaign reject reasons
 * @param {Object} params
 */
export const putCampaignDisapprove = (campaignId, props) =>
  API.put(CAMPAIGNS_DISAPPROVE.replace('{id}', campaignId), props);

/**
 * Get Campaign reject reasons
 * @param {Object} params
 */
export const getCategories = props => API.get(CATEGORIES, props);

/**
 * Get Optimizers
 * @param {Object} params
 */
export const getOptimizersStrategies = params =>
  API.get(OPTIMIZER_STRATEGIES, { params });

/**
 * Get Optimizers
 * @param {Object} params
 */
export const getOptimizer = (id, params) =>
  API.get(`${OPTIMIZER_STRATEGIES}/${id}`, { params });

/**
 * POST Optimizers
 * @param {Object} params
 */
export const postOptimizer = params =>
  API.post(`${OPTIMIZER_STRATEGIES}`, { ...params });

/**
 * PUT Optimizers
 * @param {Object} params
 */
export const putOptimizer = (id, params) =>
  API.put(`${OPTIMIZER_STRATEGIES}/${id}`, { ...params });

/**
 * Get Optimizers variables
 * @param {Object} params
 */
export const getOptimizerVariables = params =>
  API.get(`${OPTIMIZER_VARIABLES}`, { params });

/**
 * Save campaign as draft
 * @param {Object} params
 */
export const saveCampaignAsDraft = params =>
  API.post(CAMPAIGN_DRAFT, params);

/**
 * Get campaign statuses
 */
export const getCampaignStatuses = () =>
  Promise.resolve([
    {
      name: 'Pending',
      value: 'unapproved',
    },
    {
      name: 'Approved',
      value: 'enabled',
    },
    {
      name: 'Paused',
      value: 'paused',
    },
    {
      name: 'No funds',
      value: 'no_funds',
    },
    {
      name: 'Archived',
      value: 'archived',
    },
    {
      name: 'Rejected',
      value: 'rejected',
    },
    {
      name: 'No approved banners',
      value: 'unapproved_banners',
    },
  ]);

/**
 *  Flat rate
 */
export const getFlatRate = () =>
  Promise.resolve([
    {
      value: true,
      name: 'Flat rate only',
    },
    {
      value: false,
      name: 'Exclude flat rate',
    },
  ]);

/**
 * Get pricing model
 */
export const getPricingModel = async () => {
  const PRICING_MODEL = [
    {
      name: 'CPM',
      value: 'cpm',
    },
    {
      name: 'CPC',
      value: 'cpc',
    },
    {
      name: 'CPA',
      value: 'cpa',
    },
  ];
  try {
    const response = await Promise.resolve(PRICING_MODEL);

    return response;
  } catch (error) {
    return error;
  }
};

/**
 *  Client fiscal status
 */
export const getClientFiscalStatus = () =>
  Promise.resolve([
    {
      name: 'Company',
      value: 'company',
    },
    {
      name: 'Individual',
      value: 'individual',
    },
  ]);

/**
 *  Client statuses
 */
export const getClientStatuses = () =>
  Promise.resolve([
    {
      name: 'Inactive',
      value: 'inactive',
    },
    {
      name: 'Active',
      value: 'active',
    },
    {
      name: 'Pending',
      value: 'pending',
    },
    {
      name: 'Fraud',
      value: 'fraud',
    },
  ]);

/**
 *  Client roles
 */
export const getClientRols = () =>
  Promise.resolve([
    {
      name: 'Advertiser',
      value: 'advertiser',
    },
    {
      name: 'Publisher',
      value: 'publisher',
    },
    {
      name: 'Manager',
      value: 'manager',
    },
  ]);

/**
 * Currency exchange
 * @param {Object} params
 */
export const toolsCurrencyExchange = params =>
  API.get(TOOLS_CURRENCY_EXCHANGE, { params });

/**
 * URL unpack
 * @param {Object} params
 */
export const toolsUrlUnpack = params =>
  API.get(TOOLS_URL_UNPACK, { params });

/**
 *  Client roles
 */
export const getRetentionClientsFlag = () =>
  Promise.resolve([
    {
      name: 'Active (last 30 days)',
      value: false,
    },
    {
      name: 'Retention',
      value: true,
    },
  ]);

/**
 *  Get traffic source type
 */
export const getTrafficSourceType = () =>
  Promise.resolve([
    {
      name: 'None',
      value: null,
    },
    {
      name: 'Direct',
      value: 'direct',
    },
    {
      name: 'Network',
      value: 'network',
    },
  ]);

/**
 *  Get traffic source type
 */
export const getComplianceStatuses = () =>
  Promise.resolve([
    {
      name: 'Regular',
      value: 'regular',
    },
    {
      name: 'Trusted',
      value: 'trusted',
    },
    {
      name: 'Performance',
      value: 'performance',
    },
  ]);

/**
 * Traffic Types
 */
export const TRAFFICS_TYPE = [
  {
    name: 'RON',
    id: 0,
  },
  {
    name: 'Premium',
    id: 1,
  },
  {
    name: 'Members area',
    id: 2,
  },
];

/**
 *  Get Traffic Types
 */
export const getTrafficTypes = () => Promise.resolve(TRAFFICS_TYPE);

/**
 * Campaign DCPM Type
 */
export const CAMPAIGN_DCPM_TYPE = [
  {
    name: 'Standart',
    id: 0,
  },
  {
    name: 'Dynamic',
    id: 1,
  },
];

/**
 * Get Campaign DCPM Type
 */
export const getCampaignDcpmType = () =>
  Promise.resolve(CAMPAIGN_DCPM_TYPE);

/**
 * Campaign stretch time type
 */
export const campaignStretchTimeType = [
  {
    name: 'ASAP',
    id: 0,
  },
  {
    name: 'Even',
    id: 1,
  },
];

/**
 * Get Campaign stretch time type
 */
export const getCampaignStretchTimeType = () =>
  Promise.resolve(campaignStretchTimeType);

/**
 * Check RBAC permissions
 * @param {Array} permissions
 */
export const checkRBACPermissions = permissions =>
  API({
    url: RBAC_CHECK_ACCESS,
    method: 'GET',
    params: { items: permissions },
    paramsSerializer: requestParams =>
      transformRequestOptions(requestParams),
  });
