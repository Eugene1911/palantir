import { isUndefined, isArray, isNumber } from 'lodash';

const DEFAULT_VALUE_NUMBER = 0;
const DEFAULT_VALUE_STRING = '';

const statsValueProcessing = (
  value,
  { prefix, sufix, numeric, filters, calculated },
  statsItem,
) => {
  let finishValue = '';

  if (numeric) {
    finishValue = Number(value);

    if (isNumber(finishValue)) {
      if (isArray(calculated)) {
        calculated.forEach(calc => {
          finishValue = calc(statsItem);
        });
      }
    } else {
      finishValue = DEFAULT_VALUE_NUMBER;
    }
  } else {
    finishValue = isUndefined(value) ? DEFAULT_VALUE_STRING : value;
  }

  if (isArray(filters)) {
    filters.forEach(filter => {
      finishValue = filter(finishValue);
    });
  }

  if (prefix) {
    finishValue = `${prefix}${finishValue}`;
  }

  if (sufix) {
    finishValue = `${finishValue}${sufix}`;
  }

  return finishValue;
};

export default statsValueProcessing;
