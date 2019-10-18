function daysBetween(date1, date2) {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const date1Ms = date1.getTime();
  const date2Ms = date2.getTime();
  const differenceMs = Math.abs(date1Ms - date2Ms);

  return Math.round(differenceMs / ONE_DAY);
}

function getEstimatedFilter(date, negativeBalance) {
  const NA = 'N/A';
  const days = daysBetween(new Date(), new Date(date));

  if (negativeBalance) return NA;
  if (days) return days;

  return NA;
}

export default getEstimatedFilter;
