import CLONE_CAMPAIGN_TYPE from './cloneCampaignTypeActions';

export const initCloneCampaignReducer = {
  isFetching: false,
};

export function cloneCampaignReducer(state, acton) {
  switch (acton.type) {
    case CLONE_CAMPAIGN_TYPE.BEGIN:
      return {
        ...state,
        isFetching: true,
      };

    case CLONE_CAMPAIGN_TYPE.SUCCESS:
      return {
        ...state,
        isFetching: false,
      };

    case CLONE_CAMPAIGN_TYPE.FAILURE:
      return {
        ...initCloneCampaignReducer,
        isFetching: false,
      };

    default:
      return state;
  }
}
