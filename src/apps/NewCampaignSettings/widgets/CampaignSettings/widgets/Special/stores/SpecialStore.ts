import { Instance, types } from 'mobx-state-tree';

const SpecialModel = types
  .model({
    special: types.optional(types.string, ''),
  })
  .actions(self => ({
    setSpecial(newName: string) {
      self.special = newName;
    },
  }));

export type ISpecialModel = Instance<typeof SpecialModel>;

export default SpecialModel;
