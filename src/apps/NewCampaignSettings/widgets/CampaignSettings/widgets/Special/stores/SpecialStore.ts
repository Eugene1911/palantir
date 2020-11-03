import { ChangeEvent } from 'react';
import { Instance, types } from 'mobx-state-tree';
import {
  RadioValues,
  FlatDealValues,
} from '../constants/radioValues';

export type RadioTypes = RadioValues | FlatDealValues;

export type RadioFields =
  | 'adBlock'
  | 'privateMode'
  | 'flash'
  | 'flatDeal';

const InitialFeatureModel = {
  exclusive: false,
  setAnyPrice: false,
  backup: false,
};

const FeatureModel = types.model({
  exclusive: types.boolean,
  setAnyPrice: types.boolean,
  backup: types.boolean,
});

export const InitialSpecialModel = {
  feature: InitialFeatureModel,
  weight: 0,
  adBlock: RadioValues.NO_MATTER,
  privateMode: RadioValues.NO_MATTER,
  flash: RadioValues.NO_MATTER,
  flatDeal: FlatDealValues.NO,
};

const SpecialModel = types
  .model({
    feature: FeatureModel,
    weight: types.number,
    flatDeal: types.string,
    flatRate: types.maybe(types.number),
    flatImpressions: types.maybe(types.number),
    adBlock: types.string,
    privateMode: types.string,
    flash: types.string,
  })
  .actions(self => ({
    setRadioValue(value: RadioTypes, field: RadioFields): void {
      self[field] = value;
    },
    setFeature(feature: Instance<typeof SpecialModel>): void {
      self.feature = feature;
    },
    setWeight(weight: number): void {
      self.weight = weight;
    },
    setFlatRate(event: ChangeEvent<HTMLInputElement>): void {
      self.flatRate = +event.target.value;
    },
    setFlatImpressions(event: ChangeEvent<HTMLInputElement>): void {
      self.flatImpressions = +event.target.value;
    },
    clearFlatRate(): void {
      self.flatRate = undefined;
    },
    clearFlatImpressions(): void {
      self.flatImpressions = undefined;
    },
  }));

export type TSpecialModel = Instance<typeof SpecialModel>;

export default SpecialModel;
