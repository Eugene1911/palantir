import { useState, useEffect } from 'react';
import { getCampaignStatuses } from 'resources/api';

function useCampaignChangeStatusResources() {
  const [
    campaignChangeStatusResourcesState,
    setCampaignChangeStatusResourcesState,
  ] = useState([]);

  useEffect(() => {
    getCampaignStatuses().then(response =>
      setCampaignChangeStatusResourcesState(response),
    );
  }, []);

  return {
    campaignStatusesList: campaignChangeStatusResourcesState,
  };
}

export default useCampaignChangeStatusResources;
