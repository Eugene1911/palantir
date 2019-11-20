export const isObject = item =>
  Object.prototype.toString.call(item) === '[object Object]';
export const isUndefined = item =>
  Object.prototype.toString.call(item) === '[object Undefined]';
