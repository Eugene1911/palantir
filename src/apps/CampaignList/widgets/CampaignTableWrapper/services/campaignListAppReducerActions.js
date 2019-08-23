import { getCampaigns, getCampaignById } from 'resources/api';
import CAMPAIGN_LIST_ACTIONS from './campaignListAppReducerTypeActions';

export function requestCampaignById(dispatch, campaignId) {
  dispatch({
    type: CAMPAIGN_LIST_ACTIONS.BEGIN,
  });

  getCampaignById(campaignId)
    .then(({ data }) =>
      dispatch({
        type: CAMPAIGN_LIST_ACTIONS.SUCCESS_BY_ID,
        payload: data,
      }),
    )
    .catch(({ response }) =>
      dispatch({
        type: CAMPAIGN_LIST_ACTIONS.FAILURE,
        payload: response.data,
      }),
    );
}

export function requestCampaignList(dispatch, params) {
  dispatch({
    type: CAMPAIGN_LIST_ACTIONS.BEGIN,
  });

  getCampaigns(params)
    .then(({ data }) =>
      dispatch({
        type: CAMPAIGN_LIST_ACTIONS.SUCCESS,
        payload: data,
      }),
    )
    .catch(({ response }) =>
      dispatch({
        type: CAMPAIGN_LIST_ACTIONS.FAILURE,
        payload: response,
      }),
    );
}
