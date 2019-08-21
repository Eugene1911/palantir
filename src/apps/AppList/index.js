import React from 'react';
import { Link } from 'react-router-dom';
import mainAppRoutes from 'helpers/mainAppRoutes';

function AppList() {
  return (
    <ul>
      {mainAppRoutes.map(({ path }) => (
        <li key={path}>
          <Link to={path}>{path}</Link>
        </li>
      ))}
    </ul>
  );
}

export default AppList;
