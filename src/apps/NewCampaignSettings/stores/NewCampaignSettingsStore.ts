import { Instance, types } from 'mobx-state-tree';

import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
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
import EditStore, {
  InitialEditStore,
} from '../widgets/CampaignSettings/stores/EditStore';

export const InitialNewCampaignSettingsStore = {
  saveActions: InitialSaveStepActionModel,
  permissions: InitialPermissionsStore,
  edit: InitialEditStore,
  settings: InitialSettingsModel,
  scheduling: InitialSchedulingModel,
  targeting: InitialTargetingModel,
  special: InitialSpecialModel,
};

const NewCampaignSettingsStore = types
  .model({
    saveActions: SaveStepActionModel,
    permissions: PermissionsStore,
    edit: EditStore,
    settings: SettingsModel,
    scheduling: SchedulingModel,
    targeting: TargetingModel,
    special: SpecialModel,
  })
  .views(self => ({
    get isAllRequiredFieldsFilledForNext(): boolean {
      return (
        !!self.settings.name && !!self.settings.adFormat.adFormat
      );
    },
    get isAllRequiredFieldsFilledForSave(): boolean {
      if (self.edit.isEdit && !self.edit.isEditDraft) {
        return (
          !!self.settings.name && !!self.settings.adFormat.adFormat
        );
      }
      return !!self.settings.name;
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
      };
    },
    setNewCampaignSettingsEditData(data: IFullCampaignType): void {
      self.settings.setEditData(data);
      self.scheduling.setEditData(data);
      self.targeting.setEditData(data);
      self.special.setEditData(data);
    },
  }));

export type TNewCampaignSettingsStore = Instance<
  typeof NewCampaignSettingsStore
>;

export default NewCampaignSettingsStore;
