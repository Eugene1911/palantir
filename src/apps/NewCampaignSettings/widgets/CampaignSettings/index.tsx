import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import {
  INotification,
  LoadingStatus,
  IUrlParamsType,
} from 'sharedTypes';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import { inject, observer } from 'mobx-react';
import Settings from './widgets/Settings';
import Scheduling from './widgets/Scheduling';
import Targeting from './widgets/Targeting';
import Special from './widgets/Special';
import SaveStepAction from './widgets/SaveStepActions';
import { TPermissionsStore } from './stores/PermissionsStore';
import CampaignSettingsStepper from './widgets/CampaignSettingsStepper';
import CampaignSettingsHeader from './widgets/CampaignSettingsHeader';

interface ICampaignSettingsProps {
  permissions?: TPermissionsStore;
  fetchCampaignEditData?: (
    args: IUrlParamsType,
    infoNotification: (arg: INotification) => void,
    setNewCampaignSettingsEditData: (data: IFullCampaignType) => void,
  ) => void;
  setNewCampaignSettingsEditData?: (data: IFullCampaignType) => void;
}

const CampaignSettings = ({
  permissions,
  fetchCampaignEditData,
  setNewCampaignSettingsEditData,
}: ICampaignSettingsProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();
  const params = useParams<IUrlParamsType>();

  useEffect(() => {
    if (permissions.permissionsStatus === LoadingStatus.INITIAL) {
      permissions.getPermissions(infoNotification);
    }
  }, [permissions, infoNotification]);

  useEffect(() => {
    fetchCampaignEditData(
      params,
      infoNotification,
      setNewCampaignSettingsEditData,
    );
  }, [
    params,
    fetchCampaignEditData,
    infoNotification,
    setNewCampaignSettingsEditData,
  ]);

  return (
    <>
      <CampaignSettingsHeader />
      <CampaignSettingsStepper />
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
  fetchCampaignEditData:
    newCampaignSettings.edit.fetchCampaignEditData,
  setNewCampaignSettingsEditData:
    newCampaignSettings.setNewCampaignSettingsEditData,
}))(observer(CampaignSettings));
