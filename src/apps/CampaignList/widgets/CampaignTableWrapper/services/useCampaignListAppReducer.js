import { useReducer, useContext, useEffect } from 'react';
import campaignListAppReducer from './campaignListAppReducer';
import { CampaignListAppContext } from '../../../services/CampaignListAppContext';
import {
  requestCampaignList,
  requestCampaignById,
} from './campaignListAppReducerActions';

const initCampaignListAppReducer = {
  isFetching: true,
  data: {},
  searchByCampaignId: false,
};

function useCampaignListAppReducer() {
  const {
    campaignListAppReducerState,
    campaignListAppStateDispatch,
  } = useContext(CampaignListAppContext);
  const [
    campaignListAppWrapperReducerState,
    campaignListAppReducerDispatch,
  ] = useReducer(campaignListAppReducer, initCampaignListAppReducer);
  const onChangeHandler = payload =>
    campaignListAppStateDispatch({
      payload,
    });

  useEffect(() => {
    const { campaignId } = campaignListAppReducerState;

    if (campaignId) {
      requestCampaignById(campaignListAppReducerDispatch, campaignId);
    } else {
      requestCampaignList(
        campaignListAppReducerDispatch,
        campaignListAppReducerState,
      );
    }
  }, [campaignListAppReducerState]);

  return {
    onChangeHandler,
    ...campaignListAppWrapperReducerState,
  };
}

export default useCampaignListAppReducer;
