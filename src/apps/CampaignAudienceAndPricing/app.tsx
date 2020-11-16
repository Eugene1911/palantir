import React from 'react';
import WrapperStartAppComponent from 'sharedComponents/WrapperStartAppComponent';
import FilterSideStore from 'sharedWidgets/FilterSide/store/FilterSideStore';
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
    filterSideStore: FilterSideStore.create({}),
  };

  return (
    <WrapperStartAppComponent store={store}>
      <Audience />
      <Pricing />
    </WrapperStartAppComponent>
  );
}

export default CampaignAudienceAndPricing;
