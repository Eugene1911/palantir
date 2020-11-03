import { Instance, types } from 'mobx-state-tree';
import { AllCustomStatus } from 'sharedTypes';

export const InitialCountriesModel = {
  countriesRadio: AllCustomStatus.ALL,
};

const CountriesModel = types
  .model({
    countriesRadio: types.enumeration<AllCustomStatus>(
      Object.values(AllCustomStatus),
    ),
  })
  .actions(self => ({
    setCountriesRadio(countriesRadio: AllCustomStatus): void {
      self.countriesRadio = countriesRadio;
    },
  }));

export type TCountriesModel = Instance<typeof CountriesModel>;

export default CountriesModel;
