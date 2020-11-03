import { Instance } from 'mobx-state-tree';
import { AllIncludeExclude } from '../../constants/allIncludeExclude';
import BaseTagsAndEnterModel from './BaseTagsAndEnterModel';

export const InitialKeywordsModel = {
  radio: AllIncludeExclude.INCLUDE,
  list: [],
  excludeList: [],
};

const KeywordsModel = BaseTagsAndEnterModel.named('KeywordsModel');

export type TKeywordsModel = Instance<typeof KeywordsModel>;

export default KeywordsModel;
