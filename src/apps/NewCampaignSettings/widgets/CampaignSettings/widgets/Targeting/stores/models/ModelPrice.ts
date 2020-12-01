import { Instance, types } from 'mobx-state-tree';
import { ChangeEvent } from 'react';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';

export const InitialModelPriceModel = {};

const ModelPriceModel = types
  .model({
    from: types.maybe(types.number),
    to: types.maybe(types.number),
  })
  .actions(self => ({
    setFrom(event: ChangeEvent<HTMLInputElement>): void {
      self.from =
        event.target.value === '' ? undefined : +event.target.value;
    },
    setFromValue(value: number): void {
      self.from = value;
    },
    setTo(event: ChangeEvent<HTMLInputElement>): void {
      self.to =
        event.target.value === '' ? undefined : +event.target.value;
    },
    setToValue(value: number): void {
      self.to = value;
    },
  }))
  .actions(self => ({
    setEditData(data: IFullCampaignType): void {
      if (
        data.device_price_on_release_from ||
        data.device_price_on_release_from === 0
      ) {
        self.setFromValue(data.device_price_on_release_from);
      }
      if (
        data.device_price_on_release_to ||
        data.device_price_on_release_to === 0
      ) {
        self.setToValue(data.device_price_on_release_to);
      }
    },
  }));

export type TModelPriceModel = Instance<typeof ModelPriceModel>;

export default ModelPriceModel;
