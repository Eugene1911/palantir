import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import theme from 'config/theme';
import CampaignEdit from './app';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CampaignEdit />
  </ThemeProvider>,
  document.getElementById('root'),
);
