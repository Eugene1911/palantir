import { useReducer } from 'react';
import { PAGINATIONS_DEFAULT_COUNT_PAGE } from 'config/constants';
import campaignListAppReducer from './campaignListAppReducer';

const defaultCampaignListAppState = {
  page: 1,
  size: PAGINATIONS_DEFAULT_COUNT_PAGE,
};

function useCampaignListAppReducer() {
  const [
    campaignListAppReducerState,
    campaignListAppStateDispatch,
  ] = useReducer(campaignListAppReducer, defaultCampaignListAppState);

  return {
    campaignListAppReducerState,
    campaignListAppStateDispatch,
  };
}

export default useCampaignListAppReducer;
