import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import theme from 'config/theme';
import NewCampaignSettings from './app';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router basename="/advertisers/new_create_campaign_settings/">
      <NewCampaignSettings />
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);
