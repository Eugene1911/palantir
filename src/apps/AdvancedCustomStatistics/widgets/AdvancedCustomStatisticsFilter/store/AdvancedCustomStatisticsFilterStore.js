import { types, getParent, applySnapshot } from 'mobx-state-tree';
import mapValues from 'lodash/mapValues';
import formatReqestParams from 'helpers/formatReqestParams';

const AdvancedCustomStatisticsFilterModel = types.model({
  countries: types.array(types.string),
  app_id: types.array(types.number),
  format_id: types.array(types.number),
  spot_id: types.array(types.number),
  date_from: types.Date,
  date_to: types.Date,
  device_id: types.array(types.number),
  order: types.optional(types.string, ''),
});

const AdvancedCustomStatisticsFilterViews = types
  .model({})
  .views(self => ({
    get requestParams() {
      return mapValues(self.toJSON(), formatReqestParams);
    },
  }));

const AdvancedCustomStatisticsFilterActions = types
  .model({})
  .actions(self => ({
    onSubmitFilterFormHandler(event) {
      const { getStats } = getParent(self);
      getStats();
      event.preventDefault();
    },
    onChangeHandlerCountries(value, listValue) {
      const { advancedCustomStatisticsTags } = getParent(self);

      if (listValue)
        advancedCustomStatisticsTags.setCountries(listValue);

      if (value) applySnapshot(self.countries, value);
    },
    onChangeDateHandler({ startDate, endDate }) {
      self.date_from = startDate;
      self.date_to = endDate;
    },
    onChangeSpotsHandler(listValue) {
      const { advancedCustomStatisticsTags } = getParent(self);
      const spotsIds = listValue.map(({ id }) => id);

      advancedCustomStatisticsTags.setSpots(listValue);
      applySnapshot(self.spot_id, spotsIds);
    },
    onChangeApplicationsHandler(value, listValue) {
      const { advancedCustomStatisticsTags } = getParent(self);

      advancedCustomStatisticsTags.setApplications(listValue);
      applySnapshot(self.app_id, value);
    },
    onChangeHandlerFormat(value, listValue) {
      const { advancedCustomStatisticsTags } = getParent(self);

      advancedCustomStatisticsTags.setFormat(listValue);
      applySnapshot(self.format_id, value);
    },
    onChangeOrderHandler({ order }) {
      const { getStatsByOrder } = getParent(self);
      self.order = order;
      getStatsByOrder();
    },
    onChangeDeviceHandler(ids, values) {
      const { advancedCustomStatisticsTags } = getParent(self);

      advancedCustomStatisticsTags.setDevices(values);

      applySnapshot(self.device_id, ids);
    },
  }));

const AdvancedCustomStatisticsFilterStore = types.compose(
  AdvancedCustomStatisticsFilterModel,
  AdvancedCustomStatisticsFilterActions,
  AdvancedCustomStatisticsFilterViews,
);

export default AdvancedCustomStatisticsFilterStore;
