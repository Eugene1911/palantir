import { Instance, types } from 'mobx-state-tree';
import AdFormatModel, {
  InitialAdFormatModel,
} from './models/AdFormat';
import CategoriesModel, {
  InitialCategoriesModel,
} from './models/Categories';
import GroupsModel, { InitialGroupsModel } from './models/Groups';
import { ISettingsResultData } from '../../../../../types/resultTypes';

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
  .views(self => ({
    get isAllRequiredFieldsFilled(): boolean {
      return !!self.name && !!self.adFormat.adFormat;
    },
  }))
  .actions(self => ({
    setName(name: string): void {
      self.name = name;
    },
    getResultData(): ISettingsResultData {
      /* eslint-disable @typescript-eslint/camelcase */
      return {
        name: self.name,
        format_id: self.adFormat.adFormat,
        ...(self.groups.group && { group_id: self.groups.group }),
        categories: self.categories.getResultData(),
      };
      /* eslint-enable @typescript-eslint/camelcase */
    },
  }));

export type TSettingsModel = Instance<typeof SettingsModel>;

export default SettingsModel;
