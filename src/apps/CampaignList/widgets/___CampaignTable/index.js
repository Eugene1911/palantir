import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import tableHeaderRows from '../CampaignTableWrapper/tableHeaderRows';
import useCampaignTableState from './services/useCampaignTableState';
import CampaignControlButtons from '../CampaignControlButtons';

function CampaignTable({ data }) {
  const {
    orderDirection,
    orderBy,
    onOrderChangeHandler,
  } = useCampaignTableState();

  return (
    <Table size="medium">
      <TableHead>
        <TableRow>
          {tableHeaderRows.map(row => (
            <TableCell
              style={row.style}
              key={row.id}
              align={row.numeric ? 'right' : 'left'}
              sortDirection={
                orderBy === row.id ? orderDirection : false
              }
            >
              {row.order ? (
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={orderDirection}
                  onClick={onOrderChangeHandler(
                    row.id,
                    orderDirection,
                  )}
                >
                  {row.label}
                </TableSortLabel>
              ) : (
                row.label
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(row => (
          <TableRow key={row.id}>
            <TableCell align="right">{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.user.email}</TableCell>
            <TableCell>{row.pricing_model}</TableCell>
            <TableCell align="right">{row.max_daily}</TableCell>
            <TableCell align="right">{row.format_id}</TableCell>
            <TableCell align="right">{row.price}</TableCell>
            <TableCell align="right">
              <CampaignControlButtons />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

CampaignTable.propTypes = {
  data: PropTypes.array,
};

CampaignTable.defaultProps = {
  data: [],
};

export default CampaignTable;
