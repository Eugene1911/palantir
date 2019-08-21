import axios from 'axios';
import Cookies from 'js-cookie';
import { COOKIE_NAME_AUTH_TOKEN } from 'config/constants';
import { API_DOMAIN, FORMATS, CAMPAIGNS } from './endpointsApi';

const AUTH_TOKEN = Cookies.get(COOKIE_NAME_AUTH_TOKEN);
const apiOptions = {
  baseURL: API_DOMAIN,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
};
const API = axios.create(apiOptions);

/**
 * Get Ad Formats
 * @param {Object} params
 */
export const getFormats = async params => {
  try {
    const response = await API.get(FORMATS, { params });

    return response;
  } catch (error) {
    return error;
  }
};

/**
 * Get compaigns
 * @param {Object} params
 */
export const getCampaigns = params => API.get(CAMPAIGNS, { params });

/**
 * Get compaign by ID
 * @param {Object} params
 */
export const getCampaignById = campaignId =>
  API.get(`${CAMPAIGNS}/${campaignId}`);

export const getCampaignStatuses = async () => {
  const CAMPAIGN_STATUSES = [
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
  ];
  try {
    const response = await Promise.resolve(CAMPAIGN_STATUSES);

    return response;
  } catch (error) {
    return error;
  }
};

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
