import { types, getParent, applySnapshot } from 'mobx-state-tree';
import mapValues from 'lodash/mapValues';
import formatReqestParams from 'helpers/formatReqestParams';

const AdvancedCustomStatisticsFilterModel = types.model({
  countries: types.array(types.string),
  app_id: types.array(types.number),
  format_id: types.array(types.number),
  date_from: types.Date,
  date_to: types.Date,
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
    onChangeHandlerCountries(value) {
      applySnapshot(self.countries, value);
    },
    onChangeDateHandler({ startDate, endDate }) {
      self.date_from = startDate;
      self.date_to = endDate;
    },
    onChangeApplicationsHandler(value) {
      applySnapshot(self.app_id, value);
    },
    onChangeOrderHandler({ order }) {
      const { getStatsByOrder } = getParent(self);
      self.order = order;
      getStatsByOrder();
    },
  }));

const AdvancedCustomStatisticsFilterStore = types.compose(
  AdvancedCustomStatisticsFilterModel,
  AdvancedCustomStatisticsFilterActions,
  AdvancedCustomStatisticsFilterViews,
);

export default AdvancedCustomStatisticsFilterStore;
