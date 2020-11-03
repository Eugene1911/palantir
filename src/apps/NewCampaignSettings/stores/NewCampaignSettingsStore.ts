import { Instance, types } from 'mobx-state-tree';

import SettingsModel, {
  InitialSettingsModel,
} from '../widgets/CampaignSettings/widgets/Settings/stores/SettingsStore';
import SchedulingModel, {
  InitialSchedulingModel,
} from '../widgets/CampaignSettings/widgets/Scheduling/stores/SchedulingStore';
import TargetingModel, {
  InitialTargetingModel,
} from '../widgets/CampaignSettings/widgets/Targeting/stores/TargetingStore';
import SpecialModel, {
  InitialSpecialModel,
} from '../widgets/CampaignSettings/widgets/Special/stores/SpecialStore';

export const InitialNewCampaignSettingsStore = {
  settings: InitialSettingsModel,
  scheduling: InitialSchedulingModel,
  targeting: InitialTargetingModel,
  special: InitialSpecialModel,
};

const NewCampaignSettingsStore = types.model({
  settings: SettingsModel,
  scheduling: SchedulingModel,
  targeting: TargetingModel,
  special: SpecialModel,
});

export type TNewCampaignSettingsStore = Instance<
  typeof NewCampaignSettingsStore
>;

export default NewCampaignSettingsStore;
