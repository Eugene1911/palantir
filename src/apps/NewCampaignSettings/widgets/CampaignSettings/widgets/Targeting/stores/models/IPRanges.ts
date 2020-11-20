import { Instance } from 'mobx-state-tree';
import { AllIncludeExclude } from '../../constants/allIncludeExclude';
import BaseTagsAndEnterModel from './BaseTagsAndEnterModel';

export const InitialIPRangesModel = {
  radio: AllIncludeExclude.ALL,
  list: [],
  excludeList: [],
};

const IPRangesModel = BaseTagsAndEnterModel.named(
  'IPRangesModel',
).actions(self => ({
  getResultData(): {
    ip_range?: string;
    exclude_ip_range?: string;
  } {
    /* eslint-disable @typescript-eslint/camelcase */
    if (self.radio === AllIncludeExclude.INCLUDE) {
      return {
        ip_range: self.list.join(),
      };
    }
    if (self.radio === AllIncludeExclude.EXCLUDE) {
      return {
        exclude_ip_range: self.excludeList.join(),
      };
    }
    return {};
    /* eslint-enable @typescript-eslint/camelcase */
  },
}));

export type TIPRangesModel = Instance<typeof IPRangesModel>;

export default IPRangesModel;
