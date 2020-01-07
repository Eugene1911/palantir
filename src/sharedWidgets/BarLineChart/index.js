import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import XYChart from 'sharedComponents/loaders/XYChart';
import useBarLineChart from './services/useBarLineChart';

function BarLineChart({ data, isLoading, barMetric, lineMetric }) {
  const { chartOptions } = useBarLineChart(
    data,
    barMetric,
    lineMetric,
  );

  if (isLoading) {
    return <XYChart />;
  }

  return (
    <div style={{ height: 450 }}>
      <ReactEcharts
        opts={{
          height: 450,
        }}
        option={chartOptions}
      />
    </div>
  );
}

BarLineChart.propTypes = {
  barMetric: PropTypes.string.isRequired,
  data: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  lineMetric: PropTypes.string.isRequired,
};
BarLineChart.defaultProps = {
  data: [],
};

export default BarLineChart;
