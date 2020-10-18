import React, { Suspense } from 'react';
import SuspenseFallbackMain from 'sharedComponents/SuspenseFallbackMain';
import Audience from './widgets/Audience/Audience';

function CampaignAudienceAndPricing(): JSX.Element {
  return (
    <Suspense fallback={<SuspenseFallbackMain />}>
      <Audience />
    </Suspense>
  );
}

export default CampaignAudienceAndPricing;
