import {
  DRAFT_STATUS,
  PAUSED_STATUS,
  REJECTED_STATUS,
} from 'config/constants';
import { campaignsDotColors } from '../constants/campaignsDotColors';

export const getCampaignDotStatus = (
  status: string,
  isActive: boolean,
  noFunds: boolean,
  isArchived: boolean,
): { color: string; text?: string } => {
  if (status === PAUSED_STATUS) {
    return { color: campaignsDotColors.yellow, text: 'Paused' };
  }
  if (status === REJECTED_STATUS) {
    return { color: campaignsDotColors.blue, text: 'Rejected' };
  }
  if (
    (noFunds && isActive) ||
    (noFunds && status === PAUSED_STATUS)
  ) {
    return { color: campaignsDotColors.red, text: 'No funds' };
  }
  if (isActive) {
    return { color: campaignsDotColors.green, text: 'Active' };
  }
  if (isArchived) {
    return { color: campaignsDotColors.default, text: 'Archived' };
  }
  if (status === DRAFT_STATUS) {
    return { color: campaignsDotColors.default, text: 'Draft' };
  }
  return { color: campaignsDotColors.default, text: '' };
};
