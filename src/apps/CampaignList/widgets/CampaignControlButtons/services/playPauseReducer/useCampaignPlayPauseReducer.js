import { useReducer, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import CampaignTableWrapperContext from 'apps/CampaignList/widgets/CampaignTableWrapper/services/CampaignTableWrapperContext';
import {
  initStatePlayPauseStatus,
  campaignPlayPauseReducer,
} from './campaignPlayPauseReducer';
import campaignPlayPauseActions from './campaignPlayPauseActions';

function useCampaignPlayPauseReducer(initStatus) {
  const { t } = useTranslation();
  const { updateItemToCampaignList } = useContext(
    CampaignTableWrapperContext,
  );
  const infoNotification = useHookInfoNotification();
  const [campaignStatusState, campaignStatusDispatch] = useReducer(
    campaignPlayPauseReducer,
    {
      ...initStatePlayPauseStatus,
      campaignStatus: initStatus,
    },
  );
  const { isFetching, campaignStatus } = campaignStatusState;
  const isDisabledStatusButton =
    isFetching ||
    (campaignStatus !== 'paused' && campaignStatus !== 'enabled');
  const nextCampaignStatus = status =>
    status === 'enabled' ? 'pause' : 'run';
  const changeCampaignStatusHandler = (id, status) => {
    const newStatus = nextCampaignStatus(status);

    campaignPlayPauseActions(
      campaignStatusDispatch,
      id,
      newStatus,
      infoNotification,
      updateItemToCampaignList,
      t,
    );
  };
  const titleStatusToolTip = `${t(
    'campaign_list:control_button.change_status_to',
  )} ${nextCampaignStatus(campaignStatus)}`;

  return {
    campaignStatus,
    changeCampaignStatusHandler,
    isDisabledStatusButton,
    titleStatusToolTip,
  };
}

export default useCampaignPlayPauseReducer;
