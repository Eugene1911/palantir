import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import theme from 'config/theme';
import CurrencyExchange from './app';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CurrencyExchange />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
