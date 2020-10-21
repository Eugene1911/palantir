import { Instance, types } from 'mobx-state-tree';

const SchedulingModel = types
  .model({
    scheduling: types.optional(types.string, ''),
  })
  .actions(self => ({
    setScheduling(newName: string) {
      self.scheduling = newName;
    },
  }));

export type ISchedulingModel = Instance<typeof SchedulingModel>;

export default SchedulingModel;
