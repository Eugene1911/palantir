import { Instance, types } from 'mobx-state-tree';

import SettingsModel from '../widgets/CampaignSettings/widgets/Settings/stores/SettingsStore';
import SchedulingModel, {
  InitialSchedulingModel,
} from '../widgets/CampaignSettings/widgets/Scheduling/stores/SchedulingStore';
import TargetingModel from '../widgets/CampaignSettings/widgets/Targeting/stores/TargetingStore';
import SpecialModel from '../widgets/CampaignSettings/widgets/Special/stores/SpecialStore';

export const InitialNewCampaignSettingsStore = {
  settings: {},
  scheduling: InitialSchedulingModel,
  targeting: {},
  special: {},
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
