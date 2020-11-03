import { Instance } from 'mobx-state-tree';
import { AllCustomStatus, LoadingStatus } from 'sharedTypes';
import BaseTagsAndFilterModel from './BaseTagsAndFilterModel';

export const InitialCarriersModel = {
  radio: AllCustomStatus.ALL,
  list: [],
  listStatus: LoadingStatus.INITIAL,
  errorWord: 'Carriers',
};

const CarriersModel = BaseTagsAndFilterModel.named('CarriersModel');

export type TCarriersModel = Instance<typeof CarriersModel>;

export default CarriersModel;
