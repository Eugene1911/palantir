import { Instance, types } from 'mobx-state-tree';

import SettingsModel from '../widgets/CampaignSettings/widgets/Settings/stores/SettingsStore';
import SchedulingModel from '../widgets/CampaignSettings/widgets/Scheduling/stores/SchedulingStore';
import TargetingModel from '../widgets/CampaignSettings/widgets/Targeting/stores/TargetingStore';
import SpecialModel from '../widgets/CampaignSettings/widgets/Special/stores/SpecialStore';

const NewCampaignSettingsStore = types.model({
  settings: types.optional(SettingsModel, {}),
  scheduling: types.optional(SchedulingModel, {}),
  targeting: types.optional(TargetingModel, {}),
  special: types.optional(SpecialModel, {}),
});

export type INewCampaignSettingsStore = Instance<
  typeof NewCampaignSettingsStore
>;

export default NewCampaignSettingsStore;
