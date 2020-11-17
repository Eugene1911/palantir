import React from 'react';
import WrapperStartAppComponent from 'sharedComponents/WrapperStartAppComponent';
import Audience from './widgets/Audience';
import Pricing from './widgets/Pricing';
import CampaignAudienceAndPricingStore, {
  InitialCampaignAudienceAndPricingStore,
} from './stores/CampaignAudienceAndPricingStore';

function CampaignAudienceAndPricing(): JSX.Element {
  const store = {
    CampaignAudienceAndPricingStore: CampaignAudienceAndPricingStore.create(
      InitialCampaignAudienceAndPricingStore,
    ),
  };

  return (
    <WrapperStartAppComponent store={store}>
      <Audience />
      <Pricing />
    </WrapperStartAppComponent>
  );
}

export default CampaignAudienceAndPricing;
