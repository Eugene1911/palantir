import { Instance } from 'mobx-state-tree';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
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
    const result = {
      ip_range: '',
      exclude_ip_range: '',
    };
    if (self.radio === AllIncludeExclude.INCLUDE) {
      result.ip_range = self.list.join();
    }
    if (self.radio === AllIncludeExclude.EXCLUDE) {
      result.exclude_ip_range = self.excludeList.join();
    }
    return result;
    /* eslint-enable @typescript-eslint/camelcase */
  },
  setEditData(data: IFullCampaignType): void {
    if (data.ip_range && data.ip_range !== '{}') {
      const ipString = data.ip_range.replace(/["}{]/g, '');
      self.setRadio(AllIncludeExclude.INCLUDE);
      self.setTags(ipString);
    }
    if (data.exclude_ip_range && data.exclude_ip_range !== '{}') {
      const ipString = data.exclude_ip_range.replace(/["}{]/g, '');
      self.setRadio(AllIncludeExclude.EXCLUDE);
      self.setTags(ipString);
    }
  },
}));

export type TIPRangesModel = Instance<typeof IPRangesModel>;

export default IPRangesModel;
