const ALL_HOURS: string = '1'.repeat(24);
const EMPTY_HOURS: string = '0'.repeat(24);
const WORKING_HOURS: string =
  '0'.repeat(9) + '1'.repeat(9) + '0'.repeat(6);
const DAY_HOURS: string =
  '0'.repeat(7) + '1'.repeat(12) + '0'.repeat(5);
const NIGHT_HOURS: string =
  '1'.repeat(7) + '0'.repeat(12) + '1'.repeat(5);

export const ALL = ALL_HOURS.repeat(7);
export const WORKING =
  WORKING_HOURS.repeat(5) + EMPTY_HOURS.repeat(2);
export const DAY = DAY_HOURS.repeat(7);
export const NIGHT = NIGHT_HOURS.repeat(7);
