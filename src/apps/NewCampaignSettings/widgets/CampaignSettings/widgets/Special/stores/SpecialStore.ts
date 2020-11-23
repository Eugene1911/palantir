import { ChangeEvent } from 'react';
import { Instance, types } from 'mobx-state-tree';
import {
  RadioValues,
  FlatDealValues,
} from '../constants/radioValues';
import { ISpecialResultData } from '../../../../../types/resultTypes';

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
  weight: 1,
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
    /* eslint-disable @typescript-eslint/camelcase */
    getFlatDealValues(): {
      flat_rate?: number;
      flat_rate_amount?: number;
    } {
      if (self.flatDeal === FlatDealValues.NO) {
        return {};
      }
      if (
        self.flatDeal === FlatDealValues.FLAT_RATE &&
        (self.flatRate || self.flatRate === 0)
      ) {
        return { flat_rate: self.flatRate };
      }
      if (
        self.flatDeal === FlatDealValues.FLAT_IMPRESSIONS &&
        (self.flatImpressions || self.flatImpressions === 0)
      ) {
        return { flat_rate_amount: self.flatImpressions };
      }
      return {};
    },
    getRadioValue(field: RadioFields): boolean {
      return self[field] === RadioValues.ONLY_FOR;
    },
    /* eslint-enable @typescript-eslint/camelcase */
  }))
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
    getResultData(): ISpecialResultData {
      /* eslint-disable @typescript-eslint/camelcase */
      return {
        exclusive: self.feature.exclusive,
        allow_setting_any_price: self.feature.setAnyPrice,
        backup: self.feature.backup,
        weight: self.weight,
        ...self.getFlatDealValues(),
        ...(self.adBlock !== RadioValues.NO_MATTER && {
          adblock: self.getRadioValue('adBlock'),
        }),
        ...(self.flash !== RadioValues.NO_MATTER && {
          flash: self.getRadioValue('flash'),
        }),
        ...(self.privateMode !== RadioValues.NO_MATTER && {
          private_browsing: self.getRadioValue('privateMode'),
        }),
      };
      /* eslint-enable @typescript-eslint/camelcase */
    },
  }));

export type TSpecialModel = Instance<typeof SpecialModel>;

export default SpecialModel;
