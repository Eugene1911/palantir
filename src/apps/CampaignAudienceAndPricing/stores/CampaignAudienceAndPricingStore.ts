import { Instance, types } from 'mobx-state-tree';
import AudienceModel, {
  InitialAudienceModel,
} from '../widgets/Audience/stores/AudienceStore';
import PricingModel, {
  InitialPricingModel,
} from '../widgets/Pricing/stores/PricingStore';
import SaveStepActionModel, {
  InitialSaveStepActionModel,
} from '../widgets/SaveStepActions/stores/SaveStepActionsStore';
import { ICampaignAudienceAndPricingResultData } from '../assets/commonTypes';

export const InitialCampaignAudienceAndPricingStore = {
  audience: InitialAudienceModel,
  pricing: InitialPricingModel,
  saveActions: InitialSaveStepActionModel,
};

const CampaignAudienceAndPricingStore = types
  .model({
    audience: AudienceModel,
    pricing: PricingModel,
    saveActions: SaveStepActionModel,
  })
  .actions(self => ({
    getResultData(): ICampaignAudienceAndPricingResultData {
      self.audience.saveBids();
      const audienceData = self.audience.getAudienceResultData();
      const pricingData = self.pricing.getPricingResultData();
      return { ...audienceData, ...pricingData };
    },
  }));

export type TCampaignAudienceAndPricingStore = Instance<
  typeof CampaignAudienceAndPricingStore
>;

export default CampaignAudienceAndPricingStore;
