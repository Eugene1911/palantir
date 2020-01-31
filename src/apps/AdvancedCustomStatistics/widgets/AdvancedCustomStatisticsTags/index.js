import React from 'react';
import { inject, observer } from 'mobx-react';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

function AdvancedCustomStatisticsTags({
  advancedCustomStatisticsTags,
}) {
  const {
    applications,
    spots,
    countries,
    formats,
    onDeleteApplicationHandler,
    onDeleteSpotHandler,
    onDeleteCountriesHandler,
    onDeleteFormatsHandler,
  } = advancedCustomStatisticsTags;

  return (
    <>
      {applications.map(({ id, name }) => (
        <Chip
          key={id}
          variant="outlined"
          size="small"
          label={name}
          onDelete={() => onDeleteApplicationHandler(id)}
        />
      ))}
      <Divider />
      {spots.map(({ id, name }) => (
        <Chip
          key={id}
          variant="outlined"
          size="small"
          label={name}
          onDelete={() => onDeleteSpotHandler(id)}
        />
      ))}
      <Divider />
      {countries.map(({ code, name }) => (
        <Chip
          key={code}
          variant="outlined"
          size="small"
          label={name}
          onDelete={() => onDeleteCountriesHandler(code)}
        />
      ))}
      <Divider />
      {formats.map(({ id, name }) => (
        <Chip
          key={id}
          variant="outlined"
          size="small"
          label={name}
          onDelete={() => onDeleteFormatsHandler(id)}
        />
      ))}
    </>
  );
}

export default inject(({ advancedCustomStatisticsStore }) => ({
  advancedCustomStatisticsTags:
    advancedCustomStatisticsStore.advancedCustomStatisticsTags,
}))(observer(AdvancedCustomStatisticsTags));
