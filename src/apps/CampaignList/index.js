import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import theme from 'config/theme';
import CampaignListApp from './app';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CampaignListApp />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
