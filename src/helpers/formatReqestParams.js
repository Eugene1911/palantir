import isArray from 'lodash/isArray';
import dateFnsFormat from 'helpers/dateFnsFormat';
import { DATE_REQUEST_FORMAT } from 'config/constants';

function formatReqestParams(value, key) {
  if ((isArray(value) && !value.length) || !value) return null;

  if (key === 'date_from' || key === 'date_to')
    return dateFnsFormat(value, DATE_REQUEST_FORMAT);

  return value;
}

export default formatReqestParams;
