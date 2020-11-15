import { Instance, types } from 'mobx-state-tree';
import AdFormatModel, {
  InitialAdFormatModel,
} from './models/AdFormat';
import CategoriesModel, {
  InitialCategoriesModel,
} from './models/Categories';
import GroupsModel, { InitialGroupsModel } from './models/Groups';

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
  }));

export type TSettingsModel = Instance<typeof SettingsModel>;

export default SettingsModel;
