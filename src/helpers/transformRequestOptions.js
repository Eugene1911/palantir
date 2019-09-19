const transformRequestOptions = params => {
  let options = '';

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value !== 'object' && value) {
      options += `${key}=${value}&`;
    } else if (typeof value === 'object' && value && value.length) {
      value.forEach(el => {
        options += `${key}=${el}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};

export default transformRequestOptions;
