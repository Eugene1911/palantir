import { Instance, types } from 'mobx-state-tree';
import { timezones } from '../constants/timezones';

const TimezoneModel = types.model({
  value: types.number,
  label: types.string,
  isDefault: types.boolean,
});

export const InitialSchedulingModel = {
  timezones,
  timezone: timezones.filter(tz => tz.isDefault)?.[0]?.value,
};

const SchedulingModel = types
  .model({
    timezones: types.array(TimezoneModel),
    timezone: types.number,
    dateStart: types.maybe(types.string),
    dateEnd: types.maybe(types.string),
  })
  .actions(self => ({
    setTimezone(timezone: number) {
      self.timezone = timezone;
    },
    setDate(date: string, type: 'dateStart' | 'dateEnd') {
      self[type] = date;
    },
  }));

export type TSchedulingModel = Instance<typeof SchedulingModel>;

export default SchedulingModel;
