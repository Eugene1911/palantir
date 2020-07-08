import React, { Suspense, lazy } from 'react';
import CampaignEditSuspenseLoader from 'sharedComponents/loaders/CampaignEditSuspenseLoader';

const CampaignEditTargeting = lazy(() =>
  import(
    /* webpackChunkName: 'CampaignEditTargetingLazy' */ './index'
  ),
);

function CampaignEditTargetingLazy(): JSX.Element {
  return (
    <Suspense fallback={<CampaignEditSuspenseLoader rows={10} />}>
      <CampaignEditTargeting />
    </Suspense>
  );
}

export default CampaignEditTargetingLazy;
