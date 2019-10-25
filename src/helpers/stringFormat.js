export const replaceSubstring = (regexp, value) => {
  return regexp && value && typeof value === 'string'
    ? value.replace(regexp, '')
    : '';
};
