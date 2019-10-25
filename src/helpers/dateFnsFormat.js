import format from 'date-fns/format';
import { DATE_MAIN_FORMAT } from 'config/constants';

const dateFnsFormat = (date, dateFormat = DATE_MAIN_FORMAT) => {
  if (!date) return '';
  const dateObject = new Date(date);
  return format(dateObject, dateFormat);
};

export default dateFnsFormat;
