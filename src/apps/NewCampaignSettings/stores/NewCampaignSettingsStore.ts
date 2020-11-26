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
import PermissionsStore, {
  InitialPermissionsStore,
} from '../widgets/CampaignSettings/stores/PermissionsStore';

export const InitialNewCampaignSettingsStore = {
  saveActions: InitialSaveStepActionModel,
  permissions: InitialPermissionsStore,
  settings: InitialSettingsModel,
  scheduling: InitialSchedulingModel,
  targeting: InitialTargetingModel,
  special: InitialSpecialModel,
};

const NewCampaignSettingsStore = types
  .model({
    saveActions: SaveStepActionModel,
    permissions: PermissionsStore,
    settings: SettingsModel,
    scheduling: SchedulingModel,
    targeting: TargetingModel,
    special: SpecialModel,
  })
  .views(self => ({
    get isAllRequiredFieldsFilled(): boolean {
      return self.settings.isAllRequiredFieldsFilled;
    },
  }))
  .actions(self => ({
    getNewCampaignSettingsResultData(): INewCampaignSettingsResultData {
      const settingsData = self.settings.getResultData();
      const schedulingData = self.scheduling.getResultData();
      const targetingData = self.targeting.getResultData();
      const specialData = self.special.getResultData();
      return {
        ...settingsData,
        ...schedulingData,
        ...targetingData,
        ...specialData,
        // eslint-disable-next-line @typescript-eslint/camelcase
        pricing_model: 'cpm', // TODO временно, для второго шага, потом убрать
        // eslint-disable-next-line @typescript-eslint/camelcase
        max_daily: 15, // TODO временно, для второго шага, потом убрать
      };
    },
  }));

export type TNewCampaignSettingsStore = Instance<
  typeof NewCampaignSettingsStore
>;

export default NewCampaignSettingsStore;
