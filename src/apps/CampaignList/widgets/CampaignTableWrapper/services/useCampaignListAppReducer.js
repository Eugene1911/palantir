import { useReducer, useContext, useEffect } from 'react';
import campaignListAppReducer from './campaignListAppReducer';
import { CampaignListAppContext } from '../../../services/CampaignListAppContext';
import {
  setEmptyResponse,
  requestAdFormat,
  requestCampaignList,
  requestCampaignById,
  addCloneToCampaignList,
  updateItemToCampaignListAction,
} from './campaignListAppReducerActions';

const initCampaignListAppReducer = {
  isFetching: true,
  data: {},
  searchByCampaignId: false,
  adFormat: null,
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
  const { adFormat } = campaignListAppWrapperReducerState;
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
    const loadCampaignData = async () => {
      const { campaignId, user_id } = campaignListAppReducerState;

      if (
        Array.isArray(user_id) && //
        !user_id.length
      ) {
        setEmptyResponse(campaignListAppReducerDispatch);

        return;
      }

      if (!adFormat) {
        await requestAdFormat(campaignListAppReducerDispatch);
      }

      if (campaignId) {
        requestCampaignById(
          campaignListAppReducerDispatch,
          campaignId,
        );
      } else {
        requestCampaignList(
          campaignListAppReducerDispatch,
          campaignListAppReducerState,
        );
      }
    };

    loadCampaignData();
  }, [adFormat, campaignListAppReducerState]);

  return {
    onChangeHandler,
    addCloneToListHandler,
    updateItemToCampaignList,
    ...campaignListAppWrapperReducerState,
  };
}

export default useCampaignListAppReducer;
