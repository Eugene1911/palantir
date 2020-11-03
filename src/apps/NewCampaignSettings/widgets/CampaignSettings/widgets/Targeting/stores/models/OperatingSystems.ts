import { Instance } from 'mobx-state-tree';
import { AllCustomStatus, LoadingStatus } from 'sharedTypes';
import BaseTagsAndFilterModel from './BaseTagsAndFilterModel';

export const InitialOperatingSystemsModel = {
  radio: AllCustomStatus.ALL,
  list: [],
  listStatus: LoadingStatus.INITIAL,
  errorWord: 'Operating systems',
};

const OperatingSystemsModel = BaseTagsAndFilterModel.named(
  'OperatingSystemsModel',
);

export type TOperatingSystemsModel = Instance<
  typeof OperatingSystemsModel
>;

export default OperatingSystemsModel;
