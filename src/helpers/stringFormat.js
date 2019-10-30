export const replaceSubstring = (regexp, value) => {
  if (value && regexp && typeof value === 'string') {
    return value.replace(regexp, '');
  }
  return '';
};
