import { Instance, types } from 'mobx-state-tree';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
import { AllCustomStatus } from 'sharedTypes';
import { deviceTypes } from '../../widgets/Devices/constants/deviceTypes';

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
    getAccordionText(): string {
      let resultString = '';
      let summ = 0;
      self.devicesTypes.forEach((type, i) => {
        summ += type;
        if (type) {
          const name =
            deviceTypes[i][0] + deviceTypes[i].slice(1).toLowerCase();
          resultString += `${name}, `;
        }
      });
      return `Devices: ${
        summ === self.devicesTypes.length
          ? summ.toString()
          : resultString.substr(0, resultString.length - 2)
      }`;
    },
    getResultData(): number[] {
      const devices = [];
      self.devicesTypes.forEach((item, i) => {
        if (self.devicesRadio === AllCustomStatus.ALL) {
          devices.push(i);
        } else if (item) {
          devices.push(i);
        }
      });
      return devices;
    },
  }))
  .actions(self => ({
    setEditData(data: IFullCampaignType): void {
      if (
        data.devices?.length &&
        data.devices.length !==
          InitialDevicesModel.devicesTypes.length
      ) {
        self.setDevicesRadio(AllCustomStatus.CUSTOM);
        self.devicesTypes.forEach((type, index) => {
          self.toggleDeviceType(index, data.devices.includes(index));
        });
      }
    },
  }));

export type TDevicesModel = Instance<typeof DevicesModel>;

export default DevicesModel;
