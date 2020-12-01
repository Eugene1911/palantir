import { Instance } from 'mobx-state-tree';
import BaseTagsAndCategoriesModel, {
  InitialBaseTagsAndCategoriesModel,
} from './BaseTagsAndCategoriesModel';

export const InitialBrowsersModel = {
  ...InitialBaseTagsAndCategoriesModel,
  errorWord: 'Browsers',
  parentField: 'browser_id',
  editSelectedCategoryField: 'browsers',
  editSelectedItemField: 'browser_versions',
};

const BrowsersModel = BaseTagsAndCategoriesModel.named(
  'BrowsersModel',
);

export type TBrowsersModel = Instance<typeof BrowsersModel>;

export default BrowsersModel;
