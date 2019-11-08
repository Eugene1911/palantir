import React from 'react';
import Person from '@material-ui/icons/Person';
import LocationCity from '@material-ui/icons/LocationCity';

function getClientFiscalStatusIcon(status) {
  switch (status) {
    case 'company':
      return <LocationCity fontSize="small" />;
    case 'individual':
      return <Person fontSize="small" />;
    default:
      return null;
  }
}

export default getClientFiscalStatusIcon;
