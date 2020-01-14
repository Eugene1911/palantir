import qs from 'qs';
import pickBy from 'lodash/pickBy';

const requestParamsSerializer = paramsSerializr => {
  return qs.stringify(
    pickBy(paramsSerializr, value => !!value),
    { arrayFormat: 'repeat' },
  );
};

export default requestParamsSerializer;
