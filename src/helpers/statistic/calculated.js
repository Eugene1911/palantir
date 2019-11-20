import { numberToFixed } from 'helpers/numberFormat';
import dateFnsFormat from 'helpers/dateFnsFormat';

const DEFAULT_VALUE_NUMBER = 0;

export const statsCalculatesECPC = ({ amount, clicks }) => {
  const numberAmount = Number(amount);
  const nummerClicks = Number(clicks);

  if (!Number.isNaN(numberAmount) && !Number.isNaN(nummerClicks)) {
    return numberAmount / nummerClicks;
  }

  return DEFAULT_VALUE_NUMBER;
};

export const statsNumberToFixed = toFix => number =>
  numberToFixed(number, toFix);

export const statsDateFormat = format => date =>
  dateFnsFormat(date, format);
