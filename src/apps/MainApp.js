import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import mainAppRoutes from 'helpers/mainAppRoutes';

function MainApp() {
  return (
    <Router>
      {mainAppRoutes.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Router>
  );
}

export default MainApp;
