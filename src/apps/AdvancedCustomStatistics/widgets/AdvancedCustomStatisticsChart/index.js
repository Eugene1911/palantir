import React from 'react';
import { inject } from 'mobx-react';
import { LOAD_STATES } from 'config/constants';
import BarLineChart from 'sharedWidgets/BarLineChart';
import MetricsForBarLineChart from 'sharedWidgets/MetricsForBarLineChart';
import { barLineChartMetrics } from 'resources/chartMetrics';

function AdvancedCustomStatisticsChart({
  statsListForChart,
  statsListState,
}) {
  const isLoading = statsListState === LOAD_STATES.PENDING;

  return (
    <MetricsForBarLineChart
      data={statsListForChart}
      isLoading={isLoading}
      metricsList={barLineChartMetrics}
      BarLineChart={BarLineChart}
    />
  );
}

export default inject(({ advancedCustomStatisticsStore }) => ({
  statsListForChart: advancedCustomStatisticsStore.statsListForChart,
  statsListState: advancedCustomStatisticsStore.statsListState,
}))(AdvancedCustomStatisticsChart);
