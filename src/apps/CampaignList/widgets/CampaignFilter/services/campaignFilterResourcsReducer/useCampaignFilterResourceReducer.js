import { useReducer, useEffect } from 'react';
import {
  initCampaignFilterResourceState,
  campaignFilterResourceReducer,
} from './campaignFilterResourceReducer';
import requestCampaignFilterResourcs from './actionsCampaignFilterResourcs';

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
