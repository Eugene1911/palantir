import { useTheme } from '@material-ui/core/styles';
import { numberSiPrefix } from 'helpers/numberFormat';

function useBarLineChartConfig(chartData, barMetric, lineMetric) {
  const { palette } = useTheme();
  const chartConfigs = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56',
        },
      },
    },
    grid: {
      left: 50,
      right: 50,
    },
    toolbox: {
      show: true,
      feature: {
        magicType: {
          type: ['line', 'bar', 'stack', 'tiled'],
          title: {
            line: 'for line charts',
            bar: 'for bar charts',
            stack: 'for stacked charts',
            tiled: 'for tiled charts',
          },
        },
        restore: {
          title: 'restore',
        },
        saveAsImage: {
          title: 'save as image',
        },
      },
    },
  };
  const chartOptions = {
    ...chartConfigs,
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: chartData.date,
      },
      {
        show: false,
        type: 'category',
        boundaryGap: true,
        data: chartData.date,
      },
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: barMetric,
        boundaryGap: [0.2, 0.2],
        axisLabel: {
          formatter: numberSiPrefix,
        },
      },
      {
        type: 'value',
        scale: true,
        name: lineMetric,
        axisLabel: {
          formatter: numberSiPrefix,
        },
        boundaryGap: [0.2, 0.2],
      },
    ],
    series: [
      {
        color: palette.primary.main,
        name: barMetric,
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: chartData.bar,
      },
      {
        color: palette.statuses.orange,
        name: lineMetric,
        type: 'line',
        data: chartData.line,
      },
    ],
  };

  return chartOptions;
}

export default useBarLineChartConfig;
