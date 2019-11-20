import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import { LOAD_STATES } from 'config/constants';
import dateFnsFormat from 'helpers/dateFnsFormat';
import { numberSiPrefix } from 'helpers/numberFormat';
import XYChart from 'sharedComponents/loaders/XYChart';

const compareMetrics = [
  {
    name: 'Clicks',
    value: 'clicks',
  },
  {
    name: 'Impressions',
    value: 'impressions',
  },
  {
    name: 'Ecpm',
    value: 'ecpm',
  },
  {
    name: 'Price',
    value: 'amount',
  },
];
function AdvancedCustomStatisticsChart({
  advancedCustomStatisticsStore,
}) {
  const { statsList, statsListState } = advancedCustomStatisticsStore;
  const [selectMetrics, setSelectMetrics] = useState({
    bar: 'clicks',
    line: 'impressions',
  });
  const onChangeMetricHandler = ({ target }) => {
    const { value, name } = target;
    setSelectMetrics({ ...selectMetrics, ...{ [name]: value } });
  };
  const { palette } = useTheme();
  const getOption = () => {
    return {
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
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: statsList.map(({ day }) => dateFnsFormat(day)),
        },
        {
          show: false,
          type: 'category',
          boundaryGap: true,
          data: statsList.map(({ day }) => dateFnsFormat(day)),
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: selectMetrics.bar,
          // max: 30,
          // min: 0,
          boundaryGap: [0.2, 0.2],
          axisLabel: {
            formatter: numberSiPrefix,
          },
        },
        {
          type: 'value',
          scale: true,
          name: selectMetrics.line,
          // max: 1200,
          // min: 0,
          axisLabel: {
            formatter: numberSiPrefix,
          },
          boundaryGap: [0.2, 0.2],
        },
      ],
      series: [
        {
          color: palette.primary.main,
          name: selectMetrics.bar,
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: statsList.map(stats => stats[selectMetrics.bar]),
        },
        {
          color: palette.statuses.orange,
          name: selectMetrics.line,
          type: 'line',
          data: statsList.map(stats => stats[selectMetrics.line]),
        },
      ],
    };
  };

  if (statsListState === LOAD_STATES.PENDING) {
    return <XYChart />;
  }

  return (
    <>
      <div style={{ height: 450 }}>
        <ReactEcharts
          opts={{
            height: 450,
          }}
          option={getOption()}
        />
      </div>
      <CardContent>
        <Grid
          justify="space-between"
          alignItems="flex-end"
          container
          spacing={2}
        >
          <Grid item xs={12} sm={6} md>
            <FormControl fullWidth>
              <InputLabel shrink htmlFor="bar">
                Bar metric
              </InputLabel>

              <Select
                displayEmpty
                name="bar"
                onChange={onChangeMetricHandler}
                value={selectMetrics.bar}
              >
                {compareMetrics.map(({ name, value }) => (
                  <MenuItem
                    disabled={selectMetrics.line === value}
                    key={value}
                    value={value}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md>
            <FormControl fullWidth>
              <InputLabel shrink htmlFor="line">
                Line metric
              </InputLabel>

              <Select
                displayEmpty
                name="line"
                onChange={onChangeMetricHandler}
                value={selectMetrics.line}
              >
                {compareMetrics.map(({ name, value }) => (
                  <MenuItem
                    disabled={selectMetrics.bar === value}
                    key={value}
                    value={value}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
}

export default inject('advancedCustomStatisticsStore')(
  observer(AdvancedCustomStatisticsChart),
);
