import { useState } from 'react';

function useCampaignChangeStatus(initStatus) {
  const [campaignStatus, setCampaignStatus] = useState(initStatus);
  const onChangeCampaignStatusHandler = id => ({ target }) => {
    setCampaignStatus(target.value);
  };

  return {
    campaignStatus,
    onChangeCampaignStatusHandler,
  };
}

export default useCampaignChangeStatus;
