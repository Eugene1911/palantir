import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import BarChart from '@material-ui/icons/BarChart';
import TableLoader from 'sharedComponents/loaders/TableLoader';
import { numberToFixed } from 'helpers/numberFormat';
import PAGE_PATH from 'helpers/pagePath';
import CampaignControlButtons from '../CampaignControlButtons';
import CampaignChangeStatus from '../CampaignChangeStatus';

function CampaignTableBody({ data, isFetching, cols }) {
  if (isFetching) {
    return <TableLoader cols={cols} />;
  }
  return (
    <TableBody>
      {data.map(row => (
        <TableRow key={row.id}>
          <TableCell align="right">{row.id}</TableCell>
          <TableCell>
            <IconButton
              href={`${PAGE_PATH.ADVERTISER_CAMPAIGNS_STATISTIC}${row.id}`}
              size="small"
              target="_blank"
              color="primary"
            >
              <BarChart fontSize="inherit" />
            </IconButton>
          </TableCell>
          <TableCell>
            <Link
              title={row.name}
              target="_blank"
              href={`${PAGE_PATH.ADVERTISER_CAMPAIGNS_STATISTIC}${row.id}`}
            >
              {row.name}
            </Link>
          </TableCell>
          <TableCell>
            <Link
              title={row.user.email}
              href={`${PAGE_PATH.BACKOFFICE_CLIENT_RECORD}${row.user.id}`}
            >
              {row.user.email}
            </Link>
          </TableCell>
          <TableCell>{row.pricing_model}</TableCell>
          <TableCell align="right">{row.max_daily}</TableCell>
          <TableCell align="right">{row.format_id}</TableCell>
          <TableCell align="right">
            {numberToFixed(row.price, 3)}
          </TableCell>
          <TableCell>
            <CampaignChangeStatus {...row} />
          </TableCell>
          <TableCell align="right">
            <CampaignControlButtons {...row} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default CampaignTableBody;
