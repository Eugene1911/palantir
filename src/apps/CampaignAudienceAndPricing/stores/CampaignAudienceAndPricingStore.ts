import { Instance, types } from 'mobx-state-tree';
import AudienceModel, {
  InitialAudienceModel,
} from '../widgets/Audience/stores/AudienceStore';

export const InitialCampaignAudienceAndPricingStore = {
  audience: InitialAudienceModel,
};

const CampaignAudienceAndPricingStore = types.model({
  audience: AudienceModel,
});

export type TCampaignAudienceAndPricingStore = Instance<
  typeof CampaignAudienceAndPricingStore
>;

export default CampaignAudienceAndPricingStore;
