import { cast, Instance } from 'mobx-state-tree';
import { AllCustomStatus, LoadingStatus } from 'sharedTypes';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
import BaseTagsAndFilterModel from './BaseTagsAndFilterModel';

export const InitialCarriersModel = {
  radio: AllCustomStatus.ALL,
  list: [],
  listStatus: LoadingStatus.INITIAL,
  errorWord: 'Carriers',
  editSelectedId: [],
};

const CarriersModel = BaseTagsAndFilterModel.named(
  'CarriersModel',
).actions(self => ({
  setEditData(data: IFullCampaignType): void {
    if (data.carriers && data.carriers.length) {
      self.setRadio(AllCustomStatus.CUSTOM);
      self.editSelectedId = cast(data.carriers);
    }
  },
}));

export type TCarriersModel = Instance<typeof CarriersModel>;

export default CarriersModel;
