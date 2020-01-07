import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import useMetricsForBarLineChart from './services/useMetricsForBarLineChart';

function MetricsForBarLineChart({
  BarLineChart,
  data,
  isLoading,
  metricsList,
}) {
  const {
    selectMetrics,
    onChangeMetricHandler,
  } = useMetricsForBarLineChart();

  return (
    <>
      <BarLineChart
        data={data}
        isLoading={isLoading}
        barMetric={selectMetrics.barMetric}
        lineMetric={selectMetrics.lineMetric}
      />
      <CardContent>
        <Grid
          justify="space-between"
          alignItems="flex-end"
          container
          spacing={2}
        >
          <Grid item xs={12} sm={6} md>
            <FormControl fullWidth>
              <InputLabel shrink htmlFor="barMetric">
                Bar metric
              </InputLabel>

              <Select
                displayEmpty
                name="barMetric"
                onChange={onChangeMetricHandler}
                value={selectMetrics.barMetric}
              >
                {metricsList.map(({ name, value }) => (
                  <MenuItem
                    disabled={selectMetrics.lineMetric === value}
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
              <InputLabel shrink htmlFor="lineMetric">
                Line metric
              </InputLabel>

              <Select
                displayEmpty
                name="lineMetric"
                onChange={onChangeMetricHandler}
                value={selectMetrics.lineMetric}
              >
                {metricsList.map(({ name, value }) => (
                  <MenuItem
                    disabled={selectMetrics.barMetric === value}
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

MetricsForBarLineChart.propTypes = {
  BarLineChart: PropTypes.elementType.isRequired,
  data: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  metricsList: PropTypes.array.isRequired,
};
MetricsForBarLineChart.defaultProps = {
  data: [],
};

export default MetricsForBarLineChart;
