import {
  CAMPAIGNS_STATUSES,
  CLIENT_STATUSES,
} from 'config/constants';
import { campaignsDotColors } from '../constants/campaignsDotColors';

export const getCampaignDotStatus = (
  status: string,
  isActive: boolean,
  noFunds: boolean,
  isArchived: boolean,
): { color: string; text?: string } => {
  if (status === CAMPAIGNS_STATUSES.PAUSED) {
    return {
      color: campaignsDotColors.yellow,
      text: CAMPAIGNS_STATUSES.PAUSED,
    };
  }
  if (status === CAMPAIGNS_STATUSES.REJECTED) {
    return {
      color: campaignsDotColors.blue,
      text: CAMPAIGNS_STATUSES.REJECTED,
    };
  }
  if (
    (noFunds && isActive) ||
    (noFunds && status === CAMPAIGNS_STATUSES.PAUSED)
  ) {
    return {
      color: campaignsDotColors.red,
      text: CAMPAIGNS_STATUSES.NO_FUNDS,
    };
  }
  if (isActive) {
    return {
      color: campaignsDotColors.green,
      text: CLIENT_STATUSES.ACTIVE,
    };
  }
  if (isArchived) {
    return {
      color: campaignsDotColors.default,
      text: CAMPAIGNS_STATUSES.ARCHIVED,
    };
  }
  if (status === CAMPAIGNS_STATUSES.DRAFT) {
    return {
      color: campaignsDotColors.default,
      text: CAMPAIGNS_STATUSES.DRAFT,
    };
  }
  return { color: campaignsDotColors.default, text: '' };
};
