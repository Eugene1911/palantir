import { Instance } from 'mobx-state-tree';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
import { AllIncludeExclude } from '../../constants/allIncludeExclude';
import BaseTagsAndEnterModel from './BaseTagsAndEnterModel';

export const InitialKeywordsModel = {
  radio: AllIncludeExclude.INCLUDE,
  list: [],
  excludeList: [],
};

const KeywordsModel = BaseTagsAndEnterModel.named(
  'KeywordsModel',
).actions(self => ({
  setEditData(data: IFullCampaignType): void {
    if (data.keywords && data.keywords.length) {
      self.setTags(data.keywords.join());
    }
  },
}));

export type TKeywordsModel = Instance<typeof KeywordsModel>;

export default KeywordsModel;
