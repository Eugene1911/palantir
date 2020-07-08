import React, { Suspense, lazy } from 'react';
import CampaignEditSuspenseLoader from 'sharedComponents/loaders/CampaignEditSuspenseLoader';

const CampaignEditScheduling = lazy(() =>
  import(
    /* webpackChunkName: 'CampaignEditSchedulingLazy' */ './index'
  ),
);

function CampaignEditSchedulingLazy(): JSX.Element {
  return (
    <Suspense fallback={<CampaignEditSuspenseLoader rows={2} />}>
      <CampaignEditScheduling />
    </Suspense>
  );
}

export default CampaignEditSchedulingLazy;
