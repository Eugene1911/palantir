import { Instance, types } from 'mobx-state-tree';
import { ChangeEvent } from 'react';

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
    setTo(event: ChangeEvent<HTMLInputElement>): void {
      self.to =
        event.target.value === '' ? undefined : +event.target.value;
    },
  }));

export type TModelPriceModel = Instance<typeof ModelPriceModel>;

export default ModelPriceModel;
