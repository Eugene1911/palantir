import { useState } from 'react';

function useMetricsForBarLineChart() {
  const [selectMetrics, setSelectMetrics] = useState({
    barMetric: 'clicks',
    lineMetric: 'impressions',
  });
  const onChangeMetricHandler = ({ target }) => {
    const { value, name } = target;
    setSelectMetrics({ ...selectMetrics, ...{ [name]: value } });
  };

  return {
    selectMetrics,
    onChangeMetricHandler,
  };
}

export default useMetricsForBarLineChart;
