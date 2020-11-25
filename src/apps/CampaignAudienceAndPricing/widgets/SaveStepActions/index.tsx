import React from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import CampaignActions from 'sharedWidgets/CampaignActions';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import { TSaveStepActionModel } from './stores/SaveStepActionsStore';
import {
  EFetchStatus,
  ICampaignAudienceAndPricingResultData,
} from '../../assets/commonTypes';

interface ISaveStepActionProps {
  getResultData?: () => ICampaignAudienceAndPricingResultData;
  saveActions?: TSaveStepActionModel;
}

const SaveStepAction = ({
  getResultData,
  saveActions,
}: ISaveStepActionProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();
  const history = useHistory();

  const handleSaveAsDraft = (link: string): void => {
    const resultData = getResultData();
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
      isLoading={saveActions.savingStatus === EFetchStatus.PENDING}
    />
  );
};

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  getResultData: CampaignAudienceAndPricingStore.getResultData,
  saveActions: CampaignAudienceAndPricingStore.saveActions,
}))(observer(SaveStepAction));
