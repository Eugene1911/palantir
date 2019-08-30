import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableLoader from 'sharedComponents/loaders/TableLoader';
import CampaignTableRow from '../CampaignTableRow';

function CampaignTableBody({ data, isFetching, cols }) {
  if (isFetching) {
    return <TableLoader cols={cols} />;
  }
  return (
    <TableBody>
      {data.map(row => (
        <CampaignTableRow key={row.id} {...row} />
      ))}
    </TableBody>
  );
}

CampaignTableBody.propTypes = {
  cols: PropTypes.number.isRequired,
  data: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
};

CampaignTableBody.defaultProps = {
  data: [],
};

export default CampaignTableBody;
