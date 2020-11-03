import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import theme from 'config/theme';
import OptimizersApp from './app';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router basename="/advertisers/optimizers/">
      <OptimizersApp />
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);
