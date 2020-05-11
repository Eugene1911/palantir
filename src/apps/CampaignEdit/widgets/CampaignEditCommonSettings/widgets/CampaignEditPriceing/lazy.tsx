import React, { Suspense, lazy } from 'react';
import CampaignEditSuspenseLoader from 'sharedComponents/loaders/CampaignEditSuspenseLoader';

const CampaignEditPriceing = lazy(() =>
  import(
    /* webpackChunkName: 'CampaignEditPriceingLazy' */ './index'
  ),
);

function CampaignEditPriceingLazy(): JSX.Element {
  return (
    <Suspense fallback={<CampaignEditSuspenseLoader rows={4} />}>
      <CampaignEditPriceing />
    </Suspense>
  );
}

export default CampaignEditPriceingLazy;
