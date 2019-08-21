function emptyFieldsToNull(params) {
  const processingObject = {};

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      processingObject[key] = value === '' ? null : value;
    });
  }

  return processingObject;
}

export default emptyFieldsToNull;
