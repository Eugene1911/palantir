import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import BarChart from '@material-ui/icons/BarChart';
import { numberToFixed } from 'helpers/numberFormat';
import PAGE_PATH from 'helpers/pagePath';
import getUserCampaignStatus from 'helpers/getUserCampaignStatus';
import getStatusColor from 'helpers/getStatusColor';
import CampaignControlButtons from '../../../CampaignControlButtons';

function CampaignTableRow(row) {
  const statusClass = getStatusColor(row.status);

  return (
    <TableRow className={statusClass.status} key={row.id}>
      <TableCell align="right">{row.id}</TableCell>
      <TableCell>
        <Tooltip title="Campaign stats">
          <IconButton
            href={`${PAGE_PATH.ADVERTISER_CAMPAIGNS_STATISTIC}${row.id}`}
            size="small"
            target="_blank"
            color="primary"
          >
            <BarChart fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Link
          title={row.name}
          target="_blank"
          href={`${PAGE_PATH.ADVERTISER_CAMPAIGNS_EDIT}${row.id}`}
        >
          {row.name}
        </Link>
      </TableCell>
      <TableCell>
        {row.user && (
          <Link
            target="_blank"
            title={row.user.email}
            href={`${PAGE_PATH.BACKOFFICE_CLIENT_RECORD}${row.user.id}`}
          >
            {row.user.email}
          </Link>
        )}
      </TableCell>
      <TableCell align="right">
        <Typography
          style={{
            textTransform: 'uppercase',
          }}
        >
          {row.pricing_model}
        </Typography>
      </TableCell>
      <TableCell align="right">
        {numberToFixed(row.spent_today || 0, 3)}
      </TableCell>
      <TableCell align="right">{row.format}</TableCell>
      <TableCell align="right">
        {numberToFixed(row.price, 3)}
      </TableCell>
      <TableCell style={{ textTransform: 'capitalize' }}>
        {getUserCampaignStatus(row.status)}
      </TableCell>
      <TableCell align="right">
        <CampaignControlButtons {...row} />
      </TableCell>
    </TableRow>
  );
}

export default CampaignTableRow;
