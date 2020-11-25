import { Instance } from 'mobx-state-tree';
import { AllCustomStatus, LoadingStatus } from 'sharedTypes';
import BaseTagsAndCategoriesModel from './BaseTagsAndCategoriesModel';

export const InitialDeviceBrandsModel = {
  radio: AllCustomStatus.ALL,
  list: [],
  categoriesList: [],
  listStatus: LoadingStatus.INITIAL,
  errorWord: 'Device brands and models',
  parentField: 'brand_id',
};

const DeviceBrandsModel = BaseTagsAndCategoriesModel.named(
  'DeviceBrandsModel',
);

export type TDeviceBrandsModel = Instance<typeof DeviceBrandsModel>;

export default DeviceBrandsModel;
