import { Instance, types } from 'mobx-state-tree';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
import AdFormatModel, {
  InitialAdFormatModel,
} from './models/AdFormat';
import CategoriesModel, {
  InitialCategoriesModel,
} from './models/Categories';
import GroupsModel, { InitialGroupsModel } from './models/Groups';
import { ISettingsResultData } from '../../../../../types/resultTypes';
import { ISubInfoType } from '../../../../../types/subInfoType';

export const InitialSettingsModel = {
  name: '',
  groups: InitialGroupsModel,
  adFormat: InitialAdFormatModel,
  categories: InitialCategoriesModel,
};

const SettingsModel = types
  .model({
    name: types.string,
    groups: GroupsModel,
    adFormat: AdFormatModel,
    categories: CategoriesModel,
  })
  .actions(self => ({
    setName(name: string): void {
      self.name = name;
    },
    getAccordionText(): ISubInfoType {
      return {
        subInfo1: self.adFormat.getAccordionText(),
        subInfo2: self.categories.getAccordionText(),
        subInfo3: self.groups.getAccordionText(),
      };
    },
    getResultData(): ISettingsResultData {
      /* eslint-disable @typescript-eslint/camelcase */
      return {
        name: self.name,
        format_id: self.adFormat.adFormat,
        group_id: self.groups?.group?.id || null,
        categories: self.categories.getResultData(),
      };
      /* eslint-enable @typescript-eslint/camelcase */
    },
  }))
  .actions(self => ({
    setEditData(data: IFullCampaignType): void {
      self.setName(data.name);
      self.groups.setEditData(data);
      self.adFormat.setEditData(data);
      self.categories.setEditData(data);
    },
  }));

export type TSettingsModel = Instance<typeof SettingsModel>;

export default SettingsModel;
