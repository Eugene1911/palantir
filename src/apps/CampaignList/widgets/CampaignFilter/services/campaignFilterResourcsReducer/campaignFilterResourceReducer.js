import CAMPAIGN_RESOURCE_TYPES_ACTIONS from './campaignFilterResourceActionTypes';

function campaignFilterResourceReducer(state, acton) {
  switch (acton.type) {
    case CAMPAIGN_RESOURCE_TYPES_ACTIONS.BEGIN:
      return {
        ...state,
        isFetching: true,
      };

    case CAMPAIGN_RESOURCE_TYPES_ACTIONS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: acton.payload,
      };

    case CAMPAIGN_RESOURCE_TYPES_ACTIONS.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: acton.payload,
      };

    default:
      break;
  }
}

export default campaignFilterResourceReducer;
