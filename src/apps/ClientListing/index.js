import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import ReactDOM from 'react-dom';
import theme from 'config/theme';
import ClientListingApp from './app';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ClientListingApp />
  </ThemeProvider>,
  document.getElementById('root'),
);
