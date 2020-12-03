import { Instance } from 'mobx-state-tree';
import BaseTagsAndCategoriesModel, {
  InitialBaseTagsAndCategoriesModel,
} from './BaseTagsAndCategoriesModel';

export const InitialOperatingSystemsModel = {
  ...InitialBaseTagsAndCategoriesModel,
  errorWord: 'Operating systems',
  parentField: 'os_id',
  editSelectedCategoryField: 'oses',
  editSelectedItemField: 'os_versions',
};

const OperatingSystemsModel = BaseTagsAndCategoriesModel.named(
  'OperatingSystemsModel',
);

export type TOperatingSystemsModel = Instance<
  typeof OperatingSystemsModel
>;

export default OperatingSystemsModel;
