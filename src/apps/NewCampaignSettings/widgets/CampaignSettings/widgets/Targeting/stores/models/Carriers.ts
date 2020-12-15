import { Instance } from 'mobx-state-tree';
import BaseTagsAndCategoriesModel, {
  InitialBaseTagsAndCategoriesModel,
} from './BaseTagsAndCategoriesModel';

export const InitialCarriersModel = {
  ...InitialBaseTagsAndCategoriesModel,
  errorWord: 'Carriers',
  parentField: 'country_code',
  editSelectedCategoryField: 'unknown_empty_field',
  editSelectedItemField: 'carriers',
};

const CarriersModel = BaseTagsAndCategoriesModel.named(
  'CarriersModel',
);

export type TCarriersModel = Instance<typeof CarriersModel>;

export default CarriersModel;
