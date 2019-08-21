import { useReducer, useEffect } from 'react';
import campaignFilterResourceReducer from './campaignFilterResourceReducer';
import requestCampaignFilterResourcs from './actionsCampaignFilterResourcs';

const initCampaignFilterResourceState = {
  isFetching: true,
  data: {
    formats: [],
    pricingModel: [],
    campaignStatuses: [],
  },
};
function useCampaignFilterResourceReducer() {
  const [
    campaignFilterResourceState,
    dispatchCampaignFilterResource,
  ] = useReducer(
    campaignFilterResourceReducer,
    initCampaignFilterResourceState,
  );
  const { isFetching, data } = campaignFilterResourceState;

  useEffect(
    () =>
      requestCampaignFilterResourcs(dispatchCampaignFilterResource),
    [],
  );

  return {
    isFetching,
    ...data,
  };
}

export default useCampaignFilterResourceReducer;
