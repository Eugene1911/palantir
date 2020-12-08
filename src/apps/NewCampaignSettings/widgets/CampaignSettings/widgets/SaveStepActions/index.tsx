import React from 'react';
import { inject, observer } from 'mobx-react';
// import { useHistory } from 'react-router-dom';

import CampaignActions from 'sharedWidgets/CampaignActions';
import { LoadingStatus } from 'sharedTypes';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import { INewCampaignSettingsResultData } from '../../../../types/resultTypes';
import { TSaveStepActionModel } from './stores/SaveStepActionsStore';
import { TEditStore } from '../../stores/EditStore';

interface ISaveStepActionProps {
  getNewCampaignSettingsResultData?: () => INewCampaignSettingsResultData;
  saveActions?: TSaveStepActionModel;
  isAllRequiredFieldsFilled?: boolean;
  edit?: TEditStore;
}

const SaveStepAction = ({
  getNewCampaignSettingsResultData,
  saveActions,
  isAllRequiredFieldsFilled,
  edit,
}: ISaveStepActionProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();
  // const history = useHistory();

  const handleSaveAsDraft = (link: string): void => {
    const resultData = getNewCampaignSettingsResultData();
    // TODO разобраться потом с редиректом и показом уведомления на сохранение
    // const successCallback = (): void => history.push(link);
    const successCallback = (): void => {
      console.log(link);
    };
    saveActions.saveCampaign(
      infoNotification,
      resultData,
      successCallback,
      edit,
    );
  };

  return (
    <CampaignActions
      onSave={(): void =>
        handleSaveAsDraft('/CampaignAudienceAndPricing')
      }
      onSaveAsDraft={(): void => handleSaveAsDraft('/AppList')}
      isLoading={saveActions.savingStatus === LoadingStatus.LOADING}
      isSaveDisabled={!isAllRequiredFieldsFilled}
    />
  );
};

export default inject(({ newCampaignSettings }) => ({
  getNewCampaignSettingsResultData:
    newCampaignSettings.getNewCampaignSettingsResultData,
  saveActions: newCampaignSettings.saveActions,
  isAllRequiredFieldsFilled:
    newCampaignSettings.isAllRequiredFieldsFilled,
  edit: newCampaignSettings.edit,
}))(observer(SaveStepAction));
