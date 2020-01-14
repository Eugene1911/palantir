import isArray from 'lodash/isArray';
import tabelFieldsPermissionDenied from './tabelFieldsPermission';

function tableSchemeProcessing(tableScheme, campaign, user) {
  const checkFields = ({ field }) => {
    const checkList = tabelFieldsPermissionDenied[field];

    if (isArray(checkList)) {
      return !checkList.some(check => check(campaign, user));
    }

    return true;
  };

  return tableScheme.filter(checkFields);
}

export default tableSchemeProcessing;
