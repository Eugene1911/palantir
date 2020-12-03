import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import theme from 'config/theme';
import routes from './constants/routes';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router basename="new_create_campaign_settings">
      <Router>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ))}
      </Router>
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);
