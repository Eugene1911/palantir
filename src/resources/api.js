import transformRequestOptions from 'helpers/transformRequestOptions';
import {
  FORMATS,
  CAMPAIGNS,
  USERS,
  CAMPAIGNS_CLONE,
  CAMPAIGNS_SAVE_AS,
  CAMPAIGNS_ARCHIVE,
  CAMPAIGNS_REJECT_REASONS,
  CAMPAIGNS_DISAPPROVE,
} from './services/APIEndpoints';
import API from './services/APIService';

/**
 * Get Ad Formats
 * @param {Object} params
 */
export const getFormats = params => API.get(FORMATS, { params });

/**
 * Get Users
 * @param {Object} params
 */
export const getUsers = params => API.get(USERS, { params });

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
