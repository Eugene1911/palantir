import {
  CAMPAIGNS_STATUSES,
  CLIENT_STATUSES,
} from '../config/constants';

interface IHeaderStatusInterface {
  status: string;
  approved: string;
  isActive: boolean;
  isArchived: boolean;
}

export const getCampaignHeaderStatus = ({
  status,
  approved,
  isActive,
  isArchived,
}: IHeaderStatusInterface): string => {
  if (isArchived) {
    return CAMPAIGNS_STATUSES.ARCHIVED;
  }
  if (isActive) {
    return CLIENT_STATUSES.ACTIVE;
  }
  if (
    approved === CLIENT_STATUSES.PENDING &&
    status !== CAMPAIGNS_STATUSES.DRAFT
  ) {
    return CLIENT_STATUSES.PENDING;
  }
  return status;
};
