import { types, getParent } from 'mobx-state-tree';

const AdvancedCustomStatisticsTagsStore = types
  .model({
    applications: types.frozen([]),
    spots: types.frozen([]),
    countries: types.frozen([]),
    formats: types.frozen([]),
  })
  .actions(self => ({
    setApplications(applications) {
      self.applications = applications;
    },
    setSpots(spots) {
      self.spots = spots;
    },
    setCountries(countries) {
      self.countries = countries;
    },
    setFormat(formats) {
      self.formats = formats;
    },
    onDeleteSpotHandler(value) {
      const { filter } = getParent(self);
      const resultList = self.spots.filter(({ id }) => id !== value);

      filter.onChangeSpotsHandler(resultList);
    },
    onDeleteApplicationHandler(value) {
      const { filter } = getParent(self);
      const resultList = self.applications.filter(
        ({ id }) => id !== value,
      );
      const resultListIds = resultList.map(({ id }) => id);

      filter.onChangeApplicationsHandler(resultListIds, resultList);
    },
    onDeleteCountriesHandler(value) {
      const { filter } = getParent(self);
      const resultList = self.countries.filter(
        ({ code }) => code !== value,
      );

      filter.onChangeHandlerCountries(
        resultList.map(({ code }) => code),
        resultList,
      );
    },
    onDeleteFormatsHandler(value) {
      const { filter } = getParent(self);
      const resultList = self.formats.filter(
        ({ id }) => id !== value,
      );

      filter.onChangeHandlerFormat(
        resultList.map(({ id }) => id),
        resultList,
      );
    },
  }));

export default AdvancedCustomStatisticsTagsStore;
