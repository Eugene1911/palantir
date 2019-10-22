import React from 'react';
import { inject, observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import CardContent from '@material-ui/core/CardContent';
import NoData from 'sharedComponents/NoData';
import TablePaginationMain from 'sharedComponents/TablePaginationMain';
import TableHeadMainSort from 'sharedComponents/TableHeadMainSort';
import ClientListingTableBody from './components/ClientListingTableBody';
import useTableHeaderRows from './tableHeaderRows';
import useClientListingTable from './services/useClientListingTable';
import useStyles from './styles';

const ClientListingTable = inject('clientListingStore')(
  observer(({ clientListingStore }) => {
    const tableHeaderRows = useTableHeaderRows();
    const {
      setRequestGetClients,
      clientsList,
      clientsListPages,
      isPending,
    } = useClientListingTable(clientListingStore);

    if (!isPending && !clientsList.length) {
      return <NoData />;
    }

    const classes = useStyles();

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

        <div className={classes.tableResponsive}>
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
  }),
);

export default ClientListingTable;
