import { isObject, isUndefined } from 'helpers/defineType';

const DEFAULT_VALUE_NUMBER = 0;
const DEFAULT_VALUE_STRING = '';
let tableScheme = null;

const getTableSchemeByField = dataField =>
  tableScheme.find(({ field }) => field === dataField);

function isStatsFieldCanShow(field) {
  return !!field;
}

function statsValueProcessing(
  value,
  { prefix, sufix, numeric, filters, calculated },
  statsItem,
) {
  let finishValue = '';

  if (numeric) {
    finishValue = Number(value);

    if (!Number.isNaN(finishValue)) {
      if (Array.isArray(calculated)) {
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

  if (Array.isArray(filters)) {
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
}

function statsItemProcessing(statsItem) {
  const finishItem = {};

  if (isObject(statsItem)) {
    Object.entries(statsItem).forEach(([field, value]) => {
      if (isStatsFieldCanShow(field)) {
        const schemeField = getTableSchemeByField(field);

        if (schemeField) {
          const finishValue = statsValueProcessing(
            value,
            schemeField,
            statsItem,
          );
          finishItem[field] = finishValue;
        }
      }
    });
  }

  return finishItem;
}

function statsDataProcessing(statsData, scheme) {
  tableScheme = scheme;

  if (Array.isArray(statsData)) {
    return statsData.map(statsItemProcessing);
  }

  return null;
}

export default statsDataProcessing;
