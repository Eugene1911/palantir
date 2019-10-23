import { REGEXP_ONLY_NUMBERS } from '../config/constants';

export const leaveOnlyNumbers = value =>
  value.replace(REGEXP_ONLY_NUMBERS, '');
