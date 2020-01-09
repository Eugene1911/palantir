import React, { useEffect } from 'react';
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
    setRequestGetClients,
    clientsList,
    clientsListPages,
    clientsListState,
    getClientList,
  } = clientListingStore;
  const isPending: boolean = clientsListState === LOAD_STATES.PENDING;

  useEffect(() => {
    getClientList();
  }, [getClientList]);

  if (!isPending && !clientsList.length) {
    return <NoData />;
  }

  return (
    <>
      <CardContent>
        <TablePaginationMain
          page={clientsListPages.page}
          count={clientsListPages.count}
          pageSize={clientsListPages.page_size}
          isFetching={isPending}
          onChange={setRequestGetClients}
        />
      </CardContent>

      <div className="global-table-responsive">
        <Table>
          <TableHeadMainSort
            onChange={setRequestGetClients}
            isFetching={isPending}
            rows={tableHeaderRows}
          />
          <ClientListingTableBody
            clients={clientsList}
            cols={tableHeaderRows.length}
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
