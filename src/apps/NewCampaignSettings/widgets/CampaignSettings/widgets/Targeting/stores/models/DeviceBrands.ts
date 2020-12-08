import { Instance } from 'mobx-state-tree';
import BaseTagsAndCategoriesModel, {
  InitialBaseTagsAndCategoriesModel,
} from './BaseTagsAndCategoriesModel';

export const InitialDeviceBrandsModel = {
  ...InitialBaseTagsAndCategoriesModel,
  errorWord: 'Device brands and models',
  parentField: 'brand_id',
  editSelectedCategoryField: 'device_brands',
  editSelectedItemField: 'device_models',
};

const DeviceBrandsModel = BaseTagsAndCategoriesModel.named(
  'DeviceBrandsModel',
);

export type TDeviceBrandsModel = Instance<typeof DeviceBrandsModel>;

export default DeviceBrandsModel;
