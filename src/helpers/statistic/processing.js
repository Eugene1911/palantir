import { isObject, isArray, forEach } from 'lodash';
import statsValueProcessing from './statsValueProcessing';

function statsDataProcessing(statsData, tableScheme) {
  const getTableSchemeByField = dataField =>
    tableScheme.find(({ field }) => field === dataField);
  const statsItemProcessing = statsItem => {
    const finishItem = {};

    if (isObject(statsItem)) {
      forEach(statsItem, (value, field) => {
        const schemeField = getTableSchemeByField(field);

        // console.log('schemeField ->', schemeField, field);

        if (schemeField) {
          const finishValue = statsValueProcessing(
            value,
            schemeField,
            statsItem,
          );
          finishItem[field] = finishValue;
        }
      });
    }

    return finishItem;
  };

  if (isArray(statsData)) {
    return statsData.map(statsItemProcessing);
  }

  return null;
}

export default statsDataProcessing;
