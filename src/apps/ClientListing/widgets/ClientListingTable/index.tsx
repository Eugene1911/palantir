import React from 'react';
import { inject, observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import CardContent from '@material-ui/core/CardContent';
import NoData from 'sharedComponents/NoData';
import TablePaginationMain from 'sharedComponents/TablePaginationMain';
import TableHeadMainSort from 'sharedComponents/TableHeadMainSort';
import { LOAD_STATES } from 'config/constants';
import ClientListingTableBody from './components/ClientListingTableBody';
import useTableHeaderRows from './tableHeaderRows';
import { IClientListingStore } from '../../stores/ClientListingStore';

type ClientListingTableProps = {
  clientListingStore?: IClientListingStore;
};

function ClientListingTable({
  clientListingStore,
}: ClientListingTableProps): JSX.Element {
  const tableHeaderRows = useTableHeaderRows();
  const {
    clientsList,
    filter,
    countPage,
    clientsListState,
    trafficSourceType,
    complianceStatuses,
    onChangeTrafficSourceType,
    onChangeComplianceStatus,
  } = clientListingStore;
  const isPending: boolean = clientsListState === LOAD_STATES.PENDING;

  if (!isPending && !clientsList.length) {
    return <NoData />;
  }

  return (
    <>
      <CardContent>
        <TablePaginationMain
          page={filter.page}
          count={countPage}
          pageSize={filter.size}
          isFetching={isPending}
          onChange={filter.onChangePaginationHandler}
        />
      </CardContent>

      <div className="global-table-responsive">
        <Table>
          <TableHeadMainSort
            onChange={filter.onChangeOrderHandler}
            isFetching={isPending}
            rows={tableHeaderRows}
          />
          <ClientListingTableBody
            clients={clientsList}
            trafficSourceType={trafficSourceType}
            complianceStatuses={complianceStatuses}
            cols={tableHeaderRows.length}
            onChangeComplianceStatus={onChangeComplianceStatus}
            onChangeTrafficSourceType={onChangeTrafficSourceType}
            isPending={isPending}
          />
        </Table>
      </div>
    </>
  );
}

export default inject(({ clientListingStore }) => ({
  clientListingStore,
}))(observer(ClientListingTable));
