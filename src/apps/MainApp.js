import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import mainAppRoutes from 'helpers/mainAppRoutes';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from 'themes/theme.trafficstars';

function MainApp() {
  return (
    <MuiThemeProvider theme={theme}>
      <div
        style={{
          margin: '0 auto',
          maxWidth: '1570px',
        }}
      >
        <Router>
          {mainAppRoutes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default MainApp;
