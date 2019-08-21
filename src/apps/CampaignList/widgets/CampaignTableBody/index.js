import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableLoader from 'sharedComponents/loaders/TableLoader';
import CampaignControlButtons from '../CampaignControlButtons';

function CampaignTableBody({ data, isFetching, cols }) {
  if (isFetching) {
    return <TableLoader cols={cols} />;
  }
  return (
    <TableBody>
      {data.map(row => (
        <TableRow key={row.id}>
          <TableCell align='right'>{row.id}</TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.user.email}</TableCell>
          <TableCell>{row.pricing_model}</TableCell>
          <TableCell align='right'>{row.max_daily}</TableCell>
          <TableCell align='right'>{row.format_id}</TableCell>
          <TableCell align='right'>{row.price}</TableCell>
          <TableCell align='right'>
            <CampaignControlButtons />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default CampaignTableBody;
