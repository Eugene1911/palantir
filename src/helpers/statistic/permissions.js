/* eslint-disable camelcase */
import { PRICING_MODELS } from 'config/constants';

// Pricing model CPC
export const isPricingModelCPC = ({ pricing_model }) =>
  pricing_model === PRICING_MODELS.CPC;

// Show ROI
export const isShowRoi = ({ pricing_model }) =>
  pricing_model === PRICING_MODELS.CPM ||
  pricing_model === PRICING_MODELS.CPC;

// Pricing model not CPA
export const isPricingModelNotCPA = ({ pricing_model }) =>
  pricing_model !== PRICING_MODELS.CPA;
