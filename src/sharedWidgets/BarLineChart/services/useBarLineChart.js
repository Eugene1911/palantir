import formatingBarLineChartData from 'helpers/barLineChart/formatingBarLineChartData';
import useBarLineChartConfig from 'helpers/barLineChart/useBarLineChartConfig';

function useBarLineChart(data, barMetric, lineMetric) {
  const chartData = formatingBarLineChartData(
    data,
    barMetric,
    lineMetric,
  );
  const chartOptions = useBarLineChartConfig(
    chartData,
    barMetric,
    lineMetric,
  );

  return {
    chartOptions,
  };
}

export default useBarLineChart;
