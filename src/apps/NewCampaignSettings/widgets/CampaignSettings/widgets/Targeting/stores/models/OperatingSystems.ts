import { Instance } from 'mobx-state-tree';
import { AllCustomStatus, LoadingStatus } from 'sharedTypes';
import BaseTagsAndCategoriesModel from './BaseTagsAndCategoriesModel';

export const InitialOperatingSystemsModel = {
  radio: AllCustomStatus.ALL,
  list: [],
  categoriesList: [],
  listStatus: LoadingStatus.INITIAL,
  errorWord: 'Operating systems',
  parentField: 'os_id',
};

const OperatingSystemsModel = BaseTagsAndCategoriesModel.named(
  'OperatingSystemsModel',
);

export type TOperatingSystemsModel = Instance<
  typeof OperatingSystemsModel
>;

export default OperatingSystemsModel;
