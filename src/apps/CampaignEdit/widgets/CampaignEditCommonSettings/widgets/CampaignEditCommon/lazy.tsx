import React, { lazy, Suspense } from 'react';
import CampaignEditSuspenseLoader from 'sharedComponents/loaders/CampaignEditSuspenseLoader';

const CampaignEditCommon = lazy(() =>
  import(/* webpackChunkName: 'CampaignEditCommonLazy' */ './index'),
);

function CampaignEditCommonLazy(): JSX.Element {
  return (
    <Suspense fallback={<CampaignEditSuspenseLoader rows={5} />}>
      <CampaignEditCommon />
    </Suspense>
  );
}

export default CampaignEditCommonLazy;
