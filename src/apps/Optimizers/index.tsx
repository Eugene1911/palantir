import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import theme from 'config/theme';
import OptimizersApp from './app';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <OptimizersApp />
  </ThemeProvider>,
  document.getElementById('root'),
);
