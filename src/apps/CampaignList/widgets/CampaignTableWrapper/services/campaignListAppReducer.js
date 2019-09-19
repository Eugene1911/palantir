import CAMPAIGN_LIST_ACTIONS from './campaignListAppReducerTypeActions';

function campaignListAppReducer(state, acton) {
  const dataResponse = state.data.response;
  const { adFormat = {} } = state;
  const { payload } = acton;
  const setAdFormat = item => {
    const camapign = item;

    camapign.format = adFormat[item.format_id];

    return camapign;
  };
  let findCampaignIndex = null;

  switch (acton.type) {
    case CAMPAIGN_LIST_ACTIONS.BEGIN:
      return {
        ...state,
        error: null,
        searchByCampaignId: false,
        isFetching: true,
      };

    case CAMPAIGN_LIST_ACTIONS.SUCCESS:
      if (payload.response) {
        payload.response = payload.response.map(setAdFormat);
      }

      return {
        ...state,
        isFetching: false,
        searchByCampaignId: false,
        error: null,
        data: payload,
      };

    case CAMPAIGN_LIST_ACTIONS.ADD_ADFORMAT:
      return {
        ...state,
        adFormat: Object.assign(
          {},
          ...payload.map(({ id, name }) => ({ [id]: name })),
        ),
      };

    case CAMPAIGN_LIST_ACTIONS.SUCCESS_BY_ID:
      return {
        ...state,
        isFetching: false,
        searchByCampaignId: true,
        error: null,
        data: {
          response: [setAdFormat(payload)],
        },
      };

    case CAMPAIGN_LIST_ACTIONS.ADD_CLONE:
      if (Array.isArray(dataResponse)) {
        dataResponse.unshift(setAdFormat(acton.payload));
      }

      return {
        ...state,
        isFetching: false,
        searchByCampaignId: false,
        error: null,
        data: {
          ...state.data,
          response: dataResponse,
        },
      };

    case CAMPAIGN_LIST_ACTIONS.UPDATE_ITEM:
      if (payload) {
        findCampaignIndex = dataResponse.findIndex(
          ({ id }) => id === payload.id,
        );
      }

      if (findCampaignIndex !== -1) {
        dataResponse[findCampaignIndex] = {
          ...dataResponse[findCampaignIndex],
          ...payload,
        };
      }

      return {
        ...state,
        isFetching: false,
        searchByCampaignId: false,
        error: null,
        data: {
          ...state.data,
          response: dataResponse,
        },
      };

    case CAMPAIGN_LIST_ACTIONS.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: payload,
      };

    default:
      return state;
  }
}
export default campaignListAppReducer;
