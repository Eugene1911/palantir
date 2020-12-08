import { ChangeEvent } from 'react';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
import { Instance, types } from 'mobx-state-tree';
import {
  FlatDealValues,
  RadioValues,
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
      const result = {
        flat_rate: null,
        flat_rate_amount: null,
      };
      if (
        self.flatDeal === FlatDealValues.FLAT_RATE &&
        (self.flatRate || self.flatRate === 0)
      ) {
        result.flat_rate = self.flatRate;
      }
      if (
        self.flatDeal === FlatDealValues.FLAT_IMPRESSIONS &&
        (self.flatImpressions || self.flatImpressions === 0)
      ) {
        result.flat_rate_amount = self.flatImpressions;
      }
      return result;
    },
    getRadioValue(field: RadioFields): boolean {
      if (self[field] === RadioValues.NO_MATTER) {
        return null;
      }
      return self[field] === RadioValues.ONLY_FOR;
    },
    setRadioEditValue(field: RadioFields, value: boolean): void {
      if (!value && value !== false) {
        self[field] = RadioValues.NO_MATTER;
      } else {
        self[field] = value
          ? RadioValues.ONLY_FOR
          : RadioValues.EXCLUDE;
      }
    },
    /* eslint-enable @typescript-eslint/camelcase */
  }))
  .actions(self => ({
    setRadioValue(value: RadioTypes, field: RadioFields): void {
      self[field] = value;
    },
    setFeature(feature: Instance<typeof FeatureModel>): void {
      self.feature = feature;
    },
    setWeight(weight: number): void {
      self.weight = weight;
    },
    setFlatRate(event: ChangeEvent<HTMLInputElement>): void {
      self.flatRate = +event.target.value;
    },
    setFlatRateValue(value: number): void {
      self.flatRate = value;
    },
    setFlatImpressions(event: ChangeEvent<HTMLInputElement>): void {
      self.flatImpressions = +event.target.value;
    },
    setFlatImpressionsValue(value: number): void {
      self.flatImpressions = value;
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
        adblock: self.getRadioValue('adBlock'),
        flash: self.getRadioValue('flash'),
        private_browsing: self.getRadioValue('privateMode'),
      };
      /* eslint-enable @typescript-eslint/camelcase */
    },
  }))
  .actions(self => ({
    setEditData(data: IFullCampaignType): void {
      self.setFeature({
        exclusive: !!data.exclusive,
        setAnyPrice: !!data.allow_setting_any_price,
        backup: !!data.backup,
      });
      self.setWeight(data.weight || 1);
      if (data.flat_rate_amount || data.flat_rate_amount === 0) {
        self.setFlatImpressionsValue(data.flat_rate_amount);
        self.setRadioValue(
          FlatDealValues.FLAT_IMPRESSIONS,
          'flatDeal',
        );
      } else if (data.flat_rate || data.flat_rate === 0) {
        self.setFlatRateValue(data.flat_rate);
        self.setRadioValue(FlatDealValues.FLAT_RATE, 'flatDeal');
      }
      self.setRadioEditValue('adBlock', data.adblock);
      self.setRadioEditValue('flash', data.flash);
      self.setRadioEditValue('privateMode', data.private_browsing);
    },
  }));

export type TSpecialModel = Instance<typeof SpecialModel>;

export default SpecialModel;
