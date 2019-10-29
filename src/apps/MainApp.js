import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import mainAppRoutes from 'helpers/mainAppRoutes';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'config/theme';

function MainApp() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default MainApp;
