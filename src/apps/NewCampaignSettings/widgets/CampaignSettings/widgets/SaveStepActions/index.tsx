import React from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import CampaignActions from 'sharedWidgets/CampaignActions';
import { LoadingStatus } from 'sharedTypes';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import { INewCampaignSettingsResultData } from '../../../../types/resultTypes';
import { TSaveStepActionModel } from './stores/SaveStepActionsStore';

interface ISaveStepActionProps {
  getNewCampaignSettingsResultData?: () => INewCampaignSettingsResultData;
  saveActions?: TSaveStepActionModel;
}

const SaveStepAction = ({
  getNewCampaignSettingsResultData,
  saveActions,
}: ISaveStepActionProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();
  const history = useHistory();

  const handleSaveAsDraft = (link: string): void => {
    const resultData = getNewCampaignSettingsResultData();
    const successCallback = (): void => history.push(link);
    saveActions.saveCampaign(
      infoNotification,
      resultData,
      successCallback,
    );
  };

  return (
    <CampaignActions
      onSave={(): void =>
        handleSaveAsDraft('/CampaignAudienceAndPricing')
      }
      onSaveAsDraft={(): void => handleSaveAsDraft('/AppList')}
      isLoading={saveActions.savingStatus === LoadingStatus.LOADING}
    />
  );
};

export default inject(({ newCampaignSettings }) => ({
  getNewCampaignSettingsResultData:
    newCampaignSettings.getNewCampaignSettingsResultData,
  saveActions: newCampaignSettings.saveActions,
}))(observer(SaveStepAction));
