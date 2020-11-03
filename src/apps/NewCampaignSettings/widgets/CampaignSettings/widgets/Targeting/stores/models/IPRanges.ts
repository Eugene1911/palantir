import { Instance } from 'mobx-state-tree';
import { AllIncludeExclude } from '../../constants/allIncludeExclude';
import BaseTagsAndEnterModel from './BaseTagsAndEnterModel';

export const InitialIPRangesModel = {
  radio: AllIncludeExclude.ALL,
  list: [],
  excludeList: [],
};

const IPRangesModel = BaseTagsAndEnterModel.named('IPRangesModel');

export type TIPRangesModel = Instance<typeof IPRangesModel>;

export default IPRangesModel;
