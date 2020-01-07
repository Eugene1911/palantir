import { numberToFixed } from 'helpers/numberFormat';
import dateFnsFormat from 'helpers/dateFnsFormat';

const DEFAULT_VALUE_NUMBER = 0;

// Calculate CTR
export const statsCalculateCtr = ({ clicks, impressions }) =>
  (clicks / impressions) * 100;

// Calculate ECPC
export const statsCalculatesECPC = ({ amount, clicks }) => {
  const numberAmount = Number(amount);
  const nummerClicks = Number(clicks);

  if (!Number.isNaN(numberAmount) && !Number.isNaN(nummerClicks)) {
    return numberAmount / nummerClicks;
  }

  return DEFAULT_VALUE_NUMBER;
};

// Calculate ECPA
export const statsCalculateEcpa = ({ amount, leads }) =>
  amount / leads;

// Fixed Number
export const statsNumberToFixed = toFix => number =>
  numberToFixed(number, toFix);

// Format Date
export const statsDateFormat = format => date =>
  dateFnsFormat(date, format);
