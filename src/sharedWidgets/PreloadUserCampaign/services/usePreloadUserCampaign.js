import { useState, useEffect, useRef } from 'react';
import { getCampaignById } from 'resources/api';

function usePreloadUserCampaign() {
  const [isLoading, setLoading] = useState(true);
  const campaignData = useRef(null);
  const CAMPAIGN_ID = 216441;

  useEffect(() => {
    const getCampaign = async () => {
      const { data } = await getCampaignById(CAMPAIGN_ID);
      campaignData.current = data;
      setLoading(false);
    };

    getCampaign();
  }, []);

  return {
    campaign: campaignData.current,
    isLoading,
  };
}

export default usePreloadUserCampaign;
