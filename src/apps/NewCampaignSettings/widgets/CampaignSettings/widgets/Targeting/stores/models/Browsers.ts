import { Instance } from 'mobx-state-tree';
import { AllCustomStatus, LoadingStatus } from 'sharedTypes';
import BaseTagsAndCategoriesModel from './BaseTagsAndCategoriesModel';

export const InitialBrowsersModel = {
  radio: AllCustomStatus.ALL,
  list: [],
  categoriesList: [],
  listStatus: LoadingStatus.INITIAL,
  errorWord: 'Browsers',
  parentField: 'browser_id',
};

const BrowsersModel = BaseTagsAndCategoriesModel.named(
  'BrowsersModel',
);

export type TBrowsersModel = Instance<typeof BrowsersModel>;

export default BrowsersModel;
