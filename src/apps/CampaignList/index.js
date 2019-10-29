import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import ReactDOM from 'react-dom';
import theme from 'config/theme';
import CampaignListApp from './app';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CampaignListApp />
  </ThemeProvider>,
  document.getElementById('root'),
);
