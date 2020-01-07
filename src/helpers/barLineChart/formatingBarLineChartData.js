import dateFnsFormat from 'helpers/dateFnsFormat';

function formatingBarLineChartData(data, barMetric, lineMetric) {
  const formatingData = {
    bar: [],
    line: [],
    date: [],
  };
  const { bar, line, date } = formatingData;

  data.forEach(item => {
    bar.push(item[barMetric]);
    line.push(item[lineMetric]);
    date.push(dateFnsFormat(item.day));
  });

  return formatingData;
}

export default formatingBarLineChartData;
