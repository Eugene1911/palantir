import React from 'react';
import Person from '@material-ui/icons/Person';
import LocationCity from '@material-ui/icons/LocationCity';

function getClientFiscalStatusIcon(status) {
  switch (status) {
    case 'company':
      return <Person fontSize="small" />;
    case 'individual':
      return <LocationCity fontSize="small" />;
    default:
      return null;
  }
}

export default getClientFiscalStatusIcon;
