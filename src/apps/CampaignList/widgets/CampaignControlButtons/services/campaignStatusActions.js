import { putCampaignStatus } from 'resources/api';
import CAMPAIGN_STATUS_BUTTON_ACTIONS from './campaignStatusTypesActions';

function campaignStatusActions(dispatch, id, newStatus) {
  dispatch({
    type: CAMPAIGN_STATUS_BUTTON_ACTIONS.BEGIN,
  });

  putCampaignStatus(id, newStatus)
    .then(({ data }) =>
      dispatch({
        type: CAMPAIGN_STATUS_BUTTON_ACTIONS.SUCCESS,
        payload: data,
        campaignStatus: data.status,
      }),
    )
    .catch(({ response }) =>
      dispatch({
        type: CAMPAIGN_STATUS_BUTTON_ACTIONS.FAILURE,
        payload: response.data,
      }),
    );
}

export default campaignStatusActions;
