import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import theme from 'config/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import CampaignAudienceAndPricing from './app';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router basename="advertisers">
      <CampaignAudienceAndPricing />
    </Router>
  </ThemeProvider>,
  document.getElementById('roo]t'),
);
