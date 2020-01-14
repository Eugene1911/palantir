import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import theme from 'config/theme';
import AdvancedCustomStatistics from './app';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AdvancedCustomStatistics />
  </ThemeProvider>,
  document.getElementById('root'),
);
