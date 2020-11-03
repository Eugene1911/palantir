import { Instance, types } from 'mobx-state-tree';
import { deviceReleaseDates } from '../../constants/deviceReleaseDates';

const ReleaseDateModel = types.model({
  value: types.number,
  label: types.string,
  isDefault: types.boolean,
});

export const InitialDeviceReleaseDateModel = {
  date: deviceReleaseDates.filter(drd => drd.isDefault)?.[0]?.value,
  datesList: deviceReleaseDates,
};

const DeviceReleaseDateModel = types
  .model({
    date: types.number,
    datesList: types.array(ReleaseDateModel),
  })
  .actions(self => ({
    setDate(date: number): void {
      self.date = date;
    },
  }));

export type TDeviceReleaseDateModel = Instance<
  typeof DeviceReleaseDateModel
>;

export default DeviceReleaseDateModel;
