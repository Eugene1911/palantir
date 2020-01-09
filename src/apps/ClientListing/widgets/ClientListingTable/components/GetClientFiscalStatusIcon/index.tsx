import React from 'react';
import Person from '@material-ui/icons/Person';
import LocationCity from '@material-ui/icons/LocationCity';

function GetClientFiscalStatusIcon(status: string): JSX.Element {
  switch (status) {
    case 'company':
      return <LocationCity fontSize="small" />;
    case 'individual':
      return <Person fontSize="small" />;
    default:
      return null;
  }
}

export default GetClientFiscalStatusIcon;
