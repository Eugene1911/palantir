import React from 'react';
import WrapperStartAppComponent from 'sharedComponents/WrapperStartAppComponent';
import CampaignStepper from 'sharedComponents/CampaignStepper';
import Audience from './widgets/Audience';
import Pricing from './widgets/Pricing';
import SaveStepAction from './widgets/SaveStepActions';
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
      <CampaignStepper activeStep={1} />
      <Audience />
      <Pricing />
      <SaveStepAction />
    </WrapperStartAppComponent>
  );
}

export default CampaignAudienceAndPricing;
