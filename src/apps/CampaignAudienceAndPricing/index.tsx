import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import theme from 'config/theme';
import BackofficeToolsApp from './app';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BackofficeToolsApp />
  </ThemeProvider>,
  document.getElementById('root'),
);
