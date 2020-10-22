import { Instance, types } from 'mobx-state-tree';
import { ETrafficType } from '../assets/constants/trafficTypes';

const AudienceStore = types
  .model({
    trafficType: ETrafficType.RON,
  })
  .actions(self => ({
    setTrafficType(trafficType: ETrafficType) {
      self.trafficType = trafficType;
    },
  }));

export type TAudienceStore = Instance<typeof AudienceStore>;

export default AudienceStore;
