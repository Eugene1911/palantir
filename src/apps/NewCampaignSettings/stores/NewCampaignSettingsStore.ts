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
import { INewCampaignSettingsResultData } from '../types/resultTypes';
import SaveStepActionModel, {
  InitialSaveStepActionModel,
} from '../widgets/CampaignSettings/widgets/SaveStepActions/stores/SaveStepActionsStore';

export const InitialNewCampaignSettingsStore = {
  saveActions: InitialSaveStepActionModel,
  settings: InitialSettingsModel,
  scheduling: InitialSchedulingModel,
  targeting: InitialTargetingModel,
  special: InitialSpecialModel,
};

const NewCampaignSettingsStore = types
  .model({
    saveActions: SaveStepActionModel,
    settings: SettingsModel,
    scheduling: SchedulingModel,
    targeting: TargetingModel,
    special: SpecialModel,
  })
  .actions(self => ({
    getNewCampaignSettingsResultData(): INewCampaignSettingsResultData {
      const settingsData = self.settings.getSettingsResultData();
      return { ...settingsData };
    },
  }));

export type TNewCampaignSettingsStore = Instance<
  typeof NewCampaignSettingsStore
>;

export default NewCampaignSettingsStore;
