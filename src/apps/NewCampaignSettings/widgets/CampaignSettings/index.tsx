import React, { useEffect } from 'react';

import { LoadingStatus } from 'sharedTypes';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import CampaignStepper from 'sharedComponents/CampaignStepper';
import { inject, observer } from 'mobx-react';
import Settings from './widgets/Settings';
import Scheduling from './widgets/Scheduling';
import Targeting from './widgets/Targeting';
import Special from './widgets/Special';
import SaveStepAction from './widgets/SaveStepActions';
import { TPermissionsStore } from './stores/PermissionsStore';

interface ICampaignSettingsProps {
  permissions?: TPermissionsStore;
}

const CampaignSettings = ({
  permissions,
}: ICampaignSettingsProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();

  useEffect(() => {
    if (permissions.permissionsStatus === LoadingStatus.INITIAL) {
      permissions.getPermissions(infoNotification);
    }
  }, [permissions, infoNotification]);

  return (
    <>
      CampaignSettings
      <CampaignStepper activeStep={0} />
      <Settings />
      <Scheduling />
      <Targeting />
      {permissions.canUseSpecialSettings && <Special />}
      <SaveStepAction />
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  permissions: newCampaignSettings.permissions,
}))(observer(CampaignSettings));
