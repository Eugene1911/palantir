import React from 'react';
import { inject, observer } from 'mobx-react';

import CampaignFormHeader from 'sharedWidgets/CampaignFormHeader';
import { getCampaignHeaderStatus } from 'helpers/getCampaignHeaderStatus';
import { TEditStore } from '../../stores/EditStore';

interface ICampaignSettingsHeaderProps {
  edit?: TEditStore;
  name?: string;
  exclusive?: boolean;
  backup?: boolean;
}

const CampaignSettingsHeader = ({
  edit,
  name,
  exclusive,
  backup,
}: ICampaignSettingsHeaderProps): JSX.Element => {
  const campaignStatus = getCampaignHeaderStatus({
    status: edit.status,
    approved: edit.approved,
    isActive: edit.isActive,
    isArchived: edit.isArchived,
  });

  return (
    <CampaignFormHeader
      name={name}
      status={campaignStatus}
      campaignId={edit.campaignId}
      created={edit.created}
      updated={edit.updated}
      isExclusive={exclusive}
      isBackup={backup}
    />
  );
};

export default inject(({ newCampaignSettings }) => ({
  edit: newCampaignSettings.edit,
  name: newCampaignSettings.settings.name,
  backup: newCampaignSettings.special.feature.backup,
  exclusive: newCampaignSettings.special.feature.exclusive,
}))(observer(CampaignSettingsHeader));
