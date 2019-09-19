import axios from 'axios';
import {
  getFormats,
  getPricingModel,
  getCampaignStatuses,
  getFlatRate,
} from 'resources/api';
import CAMPAIGN_RESOURCE_TYPES_ACTIONS from './campaignFilterResourceActionTypes';

function requestCampaignFilterResourcs(dispatch) {
  dispatch({
    type: CAMPAIGN_RESOURCE_TYPES_ACTIONS.BEGIN,
  });

  axios
    .all([
      getFormats(),
      getPricingModel(),
      getCampaignStatuses(),
      getFlatRate(),
    ])
    .then(([formats, pricingModel, campaignStatuses, flatRate]) => {
      dispatch({
        type: CAMPAIGN_RESOURCE_TYPES_ACTIONS.SUCCESS,
        payload: {
          formats: formats.data,
          pricingModel,
          campaignStatuses,
          flatRate,
        },
      });
    })
    .catch(error =>
      dispatch({
        type: CAMPAIGN_RESOURCE_TYPES_ACTIONS.FAILURE,
        payload: error,
      }),
    );
}

export default requestCampaignFilterResourcs;
