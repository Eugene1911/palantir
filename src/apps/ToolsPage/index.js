import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import theme from 'config/theme';
import ToolsPage from './app';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ToolsPage />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
