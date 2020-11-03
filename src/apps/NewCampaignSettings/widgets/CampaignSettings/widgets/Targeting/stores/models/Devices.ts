import { Instance, types } from 'mobx-state-tree';
import { AllCustomStatus } from 'sharedTypes';

export const InitialDevicesModel = {
  devicesRadio: AllCustomStatus.ALL,
  devicesTypes: [1, 1, 1],
};

const DevicesModel = types
  .model({
    devicesRadio: types.enumeration<AllCustomStatus>(
      Object.values(AllCustomStatus),
    ),
    devicesTypes: types.array(types.number),
  })
  .views(self => ({
    get isNeedDisable(): boolean {
      let summ = 0;
      self.devicesTypes.forEach(type => {
        summ += type;
      });
      return summ === 1;
    },
  }))
  .actions(self => ({
    setDevicesRadio(devicesRadio: AllCustomStatus): void {
      self.devicesRadio = devicesRadio;
    },
    toggleDeviceType(index: number, value: boolean): void {
      self.devicesTypes[index] = +value;
    },
  }));

export type TDevicesModel = Instance<typeof DevicesModel>;

export default DevicesModel;
