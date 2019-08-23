import { useReducer } from 'react';
import campaignStatusReducer from './campaignStatusReducer';
import campaignStatusActions from './campaignStatusActions';

const initStateCampaignStatus = {
  response: null,
  isFetching: false,
  error: null,
};
function useCampaignStatusReducer(initStatus) {
  const [campaignStatusState, campaignStatusDispatch] = useReducer(
    campaignStatusReducer,
    {
      ...initStateCampaignStatus,
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

    campaignStatusActions(campaignStatusDispatch, id, newStatus);
  };
  const titleStatusToolTip = `Change status to ${nextCampaignStatus(
    campaignStatus,
  )}`;

  return {
    campaignStatus,
    changeCampaignStatusHandler,
    isDisabledStatusButton,
    titleStatusToolTip,
  };
}

export default useCampaignStatusReducer;
