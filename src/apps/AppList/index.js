/* eslint-disable import/no-cycle */
import React from 'react';
import { Link } from 'react-router-dom';
import mainAppRoutes from 'helpers/mainAppRoutes';

/* TODO fragment: delete the example demo code */
import { AccessControlDemo } from 'helpers/accessControl/example/usage';
import access from 'helpers/accessControl/controller';
/* TODO fragment end */

function AppList() {
  /* TODO fragment: delete the example demo code */

  // use default access controller (depend on flag)
  new AccessControlDemo(access).printTagretingSkills();

  /* TODO fragment end */

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
