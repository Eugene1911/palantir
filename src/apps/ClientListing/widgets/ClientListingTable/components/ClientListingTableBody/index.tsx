import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableLoader from 'sharedComponents/loaders/TableLoader';
import { numberToFixed } from 'helpers/numberFormat';
import dateFnsFormat from 'helpers/dateFnsFormat';
import PAGE_PATH from 'helpers/pagePath';
import getStatusColor from 'helpers/getStatusColor';
import GetClientFiscalStatusIcon from '../GetClientFiscalStatusIcon';
import getEstimatedFilter from './services/getEstimatedFilter';

function ClientListingTableBody({
  clients,
  isPending,
  cols,
  trafficSourceType,
  complianceStatuses,
  onChangeTrafficSourceType,
  onChangeComplianceStatus,
}: InferProps<typeof ClientListingTableBody.propTypes>): JSX.Element {
  if (isPending) {
    return <TableLoader cols={cols} />;
  }

  return (
    <TableBody>
      {clients.map(client => (
        <TableRow
          className={getStatusColor(client.status).status}
          key={client.id}
        >
          <TableCell align="right">{client.id}</TableCell>
          <TableCell>{dateFnsFormat(client.last_login)}</TableCell>
          <TableCell>
            <Tooltip title={`Login as ${client.email}`}>
              <IconButton
                color="primary"
                size="small"
                target="_blank"
                href={`${PAGE_PATH.CLIENT_LOGIN_AS}${client.id}`}
              >
                <SupervisedUserCircle />
              </IconButton>
            </Tooltip>
          </TableCell>
          <TableCell>
            <a
              target="noopener _blank"
              href={`${PAGE_PATH.BACKOFFICE_CLIENT_RECORD}${client.id}`}
            >
              <IconButton color="primary" size="small">
                {GetClientFiscalStatusIcon(client.fiscal_status)}
              </IconButton>
              {client.email}
            </a>
          </TableCell>
          <TableCell className="global-first-character-uppercase">
            {client.status}
          </TableCell>
          <TableCell>{dateFnsFormat(client.created_at)}</TableCell>
          <TableCell>{client.country_name}</TableCell>
          <TableCell>
            {!!client.company_name && client.company_name}
            {!client.company_name &&
              `${client.first_name} ${client.last_name}`}
          </TableCell>
          <TableCell className="global-first-character-uppercase">
            {client.roles &&
              client.roles.map((role: any) => role).join(',\n')}
          </TableCell>
          <TableCell>
            {client.account_manager_id && (
              <a
                target="noopener _blank"
                href={`${PAGE_PATH.BACKOFFICE_CLIENT_RECORD}${client.manager.id}`}
              >
                <i className="fa fa-external-link" />
                {client.manager.email}
              </a>
            )}
          </TableCell>
          <TableCell>
            <Select
              fullWidth
              name="traffic_source_type"
              onChange={(event): void =>
                onChangeTrafficSourceType(client.id, event)
              }
              value={client.traffic_source_type}
            >
              {trafficSourceType.map(({ value, name }: any) => (
                <MenuItem key={value} value={value}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </TableCell>
          <TableCell>
            <Select
              fullWidth
              name="compliance_status"
              onChange={(event): void =>
                onChangeComplianceStatus(client.id, event)
              }
              value={client.compliance_status}
            >
              {complianceStatuses.map(({ value, name }: any) => (
                <MenuItem key={value} value={value}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </TableCell>
          <TableCell align="right">
            {numberToFixed(client.balance, 3)}
          </TableCell>
          <TableCell align="right">
            {getEstimatedFilter(
              client.estimated_balance_end_at,
              client.can_have_negative_balance,
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

ClientListingTableBody.propTypes = {
  clients: PropTypes.array,
  cols: PropTypes.number.isRequired,
  complianceStatuses: PropTypes.array,
  isPending: PropTypes.bool.isRequired,
  onChangeComplianceStatus: PropTypes.func.isRequired,
  onChangeTrafficSourceType: PropTypes.func.isRequired,
  trafficSourceType: PropTypes.array,
};

ClientListingTableBody.defaultProps = {
  clients: [],
  trafficSourceType: [],
  complianceStatuses: [],
};

export default ClientListingTableBody;
