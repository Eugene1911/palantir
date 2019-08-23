import { FORMATS, CAMPAIGNS } from './services/APIEndpoints';
import API from './services/APIService';

/**
 * Get Ad Formats
 * @param {Object} params
 */
export const getFormats = params => API.get(FORMATS, { params });

/**
 * Get compaigns
 * @param {Object} params
 */
export const getCampaigns = params => API.get(CAMPAIGNS, { params });

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
 * Get campaign statuses
 */
export const getCampaignStatuses = () =>
  Promise.resolve([
    {
      name: 'Not Approved',
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
