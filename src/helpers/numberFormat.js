export const numberFormat = new Intl.NumberFormat('en').format;
export function numberSiPrefix(number) {
  const nn = number.toExponential(2).split(/e/);
  const u = Math.floor(+nn[1] / 3);
  return (
    nn[0] * Math.pow(10, +nn[1] - u * 3) +
    ['p', 'n', 'u', 'm', '', 'k', 'M', 'B', 'T'][u + 4]
  );
}
export const numberToFixed = (number, toFix) => {
  const convertNumber = Number(number);

  if (!Number.isNaN(convertNumber)) {
    return convertNumber.toFixed(toFix);
  }

  return number;
};
