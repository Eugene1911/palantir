import { cast, Instance } from 'mobx-state-tree';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
import { AllCustomStatus, LoadingStatus } from 'sharedTypes';
import BaseTagsAndFilterModel from './BaseTagsAndFilterModel';

export const InitialLanguagesModel = {
  radio: AllCustomStatus.ALL,
  list: [],
  listStatus: LoadingStatus.INITIAL,
  errorWord: 'Languages',
  editSelectedId: [],
};

const LanguagesModel = BaseTagsAndFilterModel.named(
  'LanguagesModel',
).actions(self => ({
  setEditData(data: IFullCampaignType): void {
    if (data.languages && data.languages.length) {
      self.setRadio(AllCustomStatus.CUSTOM);
      self.editSelectedId = cast(data.languages);
    }
  },
}));

export type TLanguagesModel = Instance<typeof LanguagesModel>;

export default LanguagesModel;
