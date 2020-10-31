import { Instance, types } from 'mobx-state-tree';
import { AllCustomStatus } from 'sharedTypes';
import { timezones } from '../constants/timezones';
import { ALL_HOURS, FULL } from '../constants/dayTimeRanges';

const TimezoneModel = types.model({
  value: types.number,
  label: types.string,
  isDefault: types.boolean,
});

export const InitialSchedulingModel = {
  timezones,
  timezone: timezones.filter(tz => tz.isDefault)?.[0]?.value,
  dayTimeRange: FULL,
  dayTimeRangeStatus: AllCustomStatus.ALL,
};

const SchedulingModel = types
  .model({
    timezones: types.array(TimezoneModel),
    timezone: types.number,
    dateStart: types.maybe(types.Date),
    dateEnd: types.maybe(types.Date),
    dayTimeRange: types.string,
    dayTimeRangeStatus: types.enumeration<AllCustomStatus>(
      Object.values(AllCustomStatus),
    ),
  })
  .actions(self => ({
    setTimezone(timezone: number): void {
      self.timezone = timezone;
    },
    setDate(date: Date, type: 'dateStart' | 'dateEnd'): void {
      self[type] = date;
    },
    // установка сразу всех часов в неделе одной строкой
    setDayTimeRange(newRange: string, status: AllCustomStatus): void {
      self.dayTimeRange = newRange;
      self.dayTimeRangeStatus = status;
    },
    // установка одного часа по его координатом в таблице
    setDayTimeHour(x: number, y: number): void {
      const hourIndex: number = y * ALL_HOURS.length + x;
      const oldHour: string = self.dayTimeRange[hourIndex];
      // oldHour - строка, например "0", нам нужно получить обратное знчение (1).
      // если просто сделать !"0", то будет false, неправильно.
      // поэтому приводим "0" к числу, тогда !Number("0") будет true.
      // но у нас строка из чисел, туда нельзя вписать "true",
      // поэтому снова приводим к числу Number(!Number("0"))
      const newHour = Number(!Number(oldHour));
      // вставляем новое значение часа на его место, путем создания новой строки
      self.dayTimeRange =
        self.dayTimeRange.substring(0, hourIndex) +
        newHour +
        self.dayTimeRange.substring(hourIndex + 1);
    },
  }));

export type TSchedulingModel = Instance<typeof SchedulingModel>;

export default SchedulingModel;
