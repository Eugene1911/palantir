import { AllCustomStatus } from 'sharedTypes';

export const ALL_HOURS: string = '1'.repeat(24);
const EMPTY_HOURS: string = '0'.repeat(24);
const WORKING_HOURS: string =
  '0'.repeat(8) + '1'.repeat(10) + '0'.repeat(6);
const DAY_HOURS: string =
  '0'.repeat(7) + '1'.repeat(13) + '0'.repeat(4);
const NIGHT_HOURS: string =
  '1'.repeat(7) + '0'.repeat(12) + '1'.repeat(5);

export const FULL = ALL_HOURS.repeat(7);
export const WORKING =
  WORKING_HOURS.repeat(5) + EMPTY_HOURS.repeat(2);
export const DAY = DAY_HOURS.repeat(7);
export const NIGHT = NIGHT_HOURS.repeat(7);

export const dayTimeRangesByStatus = {
  [AllCustomStatus.ALL]: FULL,
  [AllCustomStatus.CUSTOM]: WORKING,
};

export const DaysOfTheWeek: string[] = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
];
