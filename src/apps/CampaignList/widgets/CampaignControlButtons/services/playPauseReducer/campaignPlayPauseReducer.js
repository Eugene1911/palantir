import CAMPAIGN_PLAY_PAUSE_BUTTON_ACTIONS from './campaignPlayPauseTypesActions';

export const initStatePlayPauseStatus = {
  response: null,
  isFetching: false,
  error: null,
};

export function campaignPlayPauseReducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case CAMPAIGN_PLAY_PAUSE_BUTTON_ACTIONS.BEGIN:
      return {
        ...state,
        isFetching: true,
      };
    case CAMPAIGN_PLAY_PAUSE_BUTTON_ACTIONS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: payload,
        campaignStatus: action.campaignStatus,
      };
    case CAMPAIGN_PLAY_PAUSE_BUTTON_ACTIONS.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: payload,
      };

    default:
      return state;
  }
}
