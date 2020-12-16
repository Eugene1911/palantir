import React from 'react';
import { inject, observer } from 'mobx-react';

import CampaignActions from 'sharedWidgets/CampaignActions';
import PAGE_PATH from 'helpers/pagePath';
import { goToEditingStep } from 'helpers/goToEditingStep';
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

  const handleSave = (link?: string): void => {
    const resultData = getNewCampaignSettingsResultData();
    const successCallback = (id: number): void => {
      if (link && id) {
        goToEditingStep(link, id);
      }
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
        handleSave(PAGE_PATH.CAMPAIGN_AUDIENCE_AND_PRICING)
      }
      onSaveAsDraft={(): void => handleSave()}
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
