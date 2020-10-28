import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import OptimizerCreate from './widgets/OptimizerCreate';
import OptimizersList from './widgets/OptimizersList';

function AppRouters(): JSX.Element {
  const { path } = useRouteMatch();

  return (
    <Router>
      <Route exact path={path} component={OptimizersList} />
      <Route path={`${path}/create`} component={OptimizerCreate} />
      <Route path={`${path}/edit/:id`} component={OptimizerCreate} />
    </Router>
  );
}

export default AppRouters;
