import emptyFieldsToNull from 'helpers/emptyFieldsToNull';
import CAMPAIGN_LIST_TYPES_ACTIONS from './campaignListAppActionsType';

function campaignListAppReducer(state, action) {
  const { payload } = action;

  switch (action.type) {
    case CAMPAIGN_LIST_TYPES_ACTIONS.REQUEST:
      return {
        ...state,
        ...payload,
      };

    case CAMPAIGN_LIST_TYPES_ACTIONS.REQUEST_CAMPAIGN_ID:
      return {
        ...state,
        ...payload,
      };

    case CAMPAIGN_LIST_TYPES_ACTIONS.REQUEST_MAIN_FILTER:
      return {
        ...state,
        ...emptyFieldsToNull(payload),
        page: 1,
        campaignId: null,
      };

    default:
      return {
        ...state,
        ...payload,
      };
  }
}

export default campaignListAppReducer;
