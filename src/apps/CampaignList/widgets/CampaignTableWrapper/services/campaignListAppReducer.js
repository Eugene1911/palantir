import CAMPAIGN_LIST_ACTIONS from './campaignListAppReducerTypeActions';

function campaignListAppReducer(state, acton) {
  switch (acton.type) {
    case CAMPAIGN_LIST_ACTIONS.BEGIN:
      return {
        ...state,
        error: null,
        searchByCampaignId: false,
        isFetching: true,
      };

    case CAMPAIGN_LIST_ACTIONS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        searchByCampaignId: false,
        error: null,
        data: acton.payload,
      };

    case CAMPAIGN_LIST_ACTIONS.SUCCESS_BY_ID:
      return {
        ...state,
        isFetching: false,
        searchByCampaignId: true,
        error: null,
        data: {
          response: [acton.payload],
        },
      };

    case CAMPAIGN_LIST_ACTIONS.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: acton.payload,
      };

    default:
      return state;
  }
}
export default campaignListAppReducer;
