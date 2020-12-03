import { Instance, types } from 'mobx-state-tree';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
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
  }))
  .actions(self => ({
    setEditData(data: IFullCampaignType): void {
      if (data.device_release_date_offset) {
        self.setDate(data.device_release_date_offset);
      }
    },
  }));

export type TDeviceReleaseDateModel = Instance<
  typeof DeviceReleaseDateModel
>;

export default DeviceReleaseDateModel;
