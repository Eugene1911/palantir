import { Instance, types } from 'mobx-state-tree';

const SettingsModel = types
  .model({
    settings: types.optional(types.string, ''),
  })
  .actions(self => ({
    setSettings(newName: string) {
      self.settings = newName;
    },
  }));

export type ISettingsModel = Instance<typeof SettingsModel>;

export default SettingsModel;
