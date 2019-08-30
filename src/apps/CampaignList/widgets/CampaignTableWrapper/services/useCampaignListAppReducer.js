import { useReducer, useContext, useEffect } from 'react';
import campaignListAppReducer from './campaignListAppReducer';
import { CampaignListAppContext } from '../../../services/CampaignListAppContext';
import {
  requestCampaignList,
  requestCampaignById,
  addCloneToCampaignList,
  updateItemToCampaignListAction,
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
  const addCloneToListHandler = campaignClone =>
    addCloneToCampaignList(
      campaignListAppReducerDispatch,
      campaignClone,
    );
  const updateItemToCampaignList = campaign =>
    updateItemToCampaignListAction(
      campaignListAppReducerDispatch,
      campaign,
    );
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
    addCloneToListHandler,
    updateItemToCampaignList,
    ...campaignListAppWrapperReducerState,
  };
}

export default useCampaignListAppReducer;
