import React from 'react';
import { inject, observer } from 'mobx-react';

import CampaignFormHeader from 'sharedWidgets/CampaignFormHeader';
import {
  CAMPAIGNS_STATUSES,
  CLIENT_STATUSES,
} from 'config/constants';
import { TEditStore } from '../../stores/EditStore';

interface IHeaderProps {
  edit?: TEditStore;
  name?: string;
}

const Header = ({ edit, name }: IHeaderProps): JSX.Element => {
  const getStatus = (): string => {
    if (edit.isArchived) {
      return CAMPAIGNS_STATUSES.ARCHIVED;
    }
    if (edit.isActive) {
      return CLIENT_STATUSES.ACTIVE;
    }
    if (
      edit.approved === CLIENT_STATUSES.PENDING &&
      edit.status !== CAMPAIGNS_STATUSES.DRAFT
    ) {
      return CLIENT_STATUSES.PENDING;
    }
    return edit.status;
  };

  const campaignStatus = getStatus();

  return (
    <CampaignFormHeader
      name={name}
      status={campaignStatus}
      campaignId={edit.campaignId}
    />
  );
};

export default inject(({ newCampaignSettings }) => ({
  edit: newCampaignSettings.edit,
  name: newCampaignSettings.settings.name,
}))(observer(Header));
