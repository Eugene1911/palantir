import { Instance, types } from 'mobx-state-tree';

const TargetingModel = types
  .model({
    targeting: types.optional(types.string, ''),
  })
  .actions(self => ({
    setTargeting(newName: string) {
      self.targeting = newName;
    },
  }));

export type TTargetingModel = Instance<typeof TargetingModel>;

export default TargetingModel;
