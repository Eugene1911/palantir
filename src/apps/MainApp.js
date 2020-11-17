import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import mainAppRoutes from 'helpers/mainAppRoutes';
import { SnackbarProvider } from 'notistack';
import { MAX_COUNT_SNACK } from 'config/constants';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'config/theme';

function MainApp() {
  return (
    <SnackbarProvider maxSnack={MAX_COUNT_SNACK}>
      <ThemeProvider theme={theme}>
        <div
          style={{
            margin: '0 auto',
            maxWidth: '1570px',
          }}
        >
          <Router>
            <Switch>
              {mainAppRoutes.map(route => (
                <Route key={route.path} {...route} />
              ))}
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default MainApp;
