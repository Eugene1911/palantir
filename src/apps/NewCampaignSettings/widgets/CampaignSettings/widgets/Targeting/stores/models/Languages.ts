import { Instance } from 'mobx-state-tree';
import { AllCustomStatus, LoadingStatus } from 'sharedTypes';
import BaseTagsAndFilterModel from './BaseTagsAndFilterModel';

export const InitialLanguagesModel = {
  radio: AllCustomStatus.ALL,
  list: [],
  listStatus: LoadingStatus.INITIAL,
  errorWord: 'Languages',
};

const LanguagesModel = BaseTagsAndFilterModel.named('LanguagesModel');

export type TLanguagesModel = Instance<typeof LanguagesModel>;

export default LanguagesModel;
