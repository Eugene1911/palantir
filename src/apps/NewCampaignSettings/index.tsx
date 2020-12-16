import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import theme from 'config/theme';
import NewCampaignSettings from './app';

const { pathname } = window.location;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router basename={pathname}>
      <NewCampaignSettings />
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);
