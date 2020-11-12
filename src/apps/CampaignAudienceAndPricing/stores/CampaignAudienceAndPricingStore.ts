import { Instance, types } from 'mobx-state-tree';
import AudienceModel, {
  InitialAudienceModel,
} from '../widgets/Audience/stores/AudienceStore';
import PricingModel, {
  InitialPricingModel,
} from '../widgets/Pricing/stores/PricingStore';

export const InitialCampaignAudienceAndPricingStore = {
  audience: InitialAudienceModel,
  pricing: InitialPricingModel,
};

const CampaignAudienceAndPricingStore = types.model({
  audience: AudienceModel,
  pricing: PricingModel,
});

export type TCampaignAudienceAndPricingStore = Instance<
  typeof CampaignAudienceAndPricingStore
>;

export default CampaignAudienceAndPricingStore;
