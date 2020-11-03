import { Instance } from 'mobx-state-tree';
import { AllCustomStatus, LoadingStatus } from 'sharedTypes';
import BaseTagsAndFilterModel from './BaseTagsAndFilterModel';

export const InitialBrowsersModel = {
  radio: AllCustomStatus.ALL,
  list: [],
  listStatus: LoadingStatus.INITIAL,
  errorWord: 'Browsers',
};

const BrowsersModel = BaseTagsAndFilterModel.named('BrowsersModel');

export type TBrowsersModel = Instance<typeof BrowsersModel>;

export default BrowsersModel;
