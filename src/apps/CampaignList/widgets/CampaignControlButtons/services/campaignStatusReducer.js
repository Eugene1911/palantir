import CAMPAIGN_STATUS_BUTTON_ACTIONS from './campaignStatusTypesActions';

function campaignStatusReducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case CAMPAIGN_STATUS_BUTTON_ACTIONS.BEGIN:
      return {
        ...state,
        isFetching: true,
      };
    case CAMPAIGN_STATUS_BUTTON_ACTIONS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: payload,
        campaignStatus: action.campaignStatus,
      };
    case CAMPAIGN_STATUS_BUTTON_ACTIONS.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: payload,
      };

    default:
      return state;
  }
}

export default campaignStatusReducer;
