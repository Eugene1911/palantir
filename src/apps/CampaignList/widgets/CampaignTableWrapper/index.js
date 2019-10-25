import React, { useMemo } from 'react';
import Table from '@material-ui/core/Table';
import NoData from 'sharedComponents/NoData';
import TablePaginationMain from 'sharedComponents/TablePaginationMain';
import TableHeadMainSort from 'sharedComponents/TableHeadMainSort';
import CardContent from '@material-ui/core/CardContent';
import CampaignTableBody from './components/CampaignTableBody';
import useCampaignListAppReducer from './services/useCampaignListAppReducer';
import useTableHeaderRows from './tableHeaderRows';
import CampaignTableWrapperContext from './services/CampaignTableWrapperContext';

function CampaignTableWrapper() {
  const tableHeaderRows = useTableHeaderRows();
  const {
    isFetching,
    error,
    data,
    searchByCampaignId,
    onChangeHandler,
    addCloneToListHandler,
    updateItemToCampaignList,
  } = useCampaignListAppReducer();

  return useMemo(() => {
    if (error) {
      return <NoData title={error.msg} />;
    }

    if (
      (!isFetching && !data) ||
      (data && data.response && !data.response.length)
    ) {
      return <NoData />;
    }

    return (
      <>
        <CardContent>
          <TablePaginationMain
            isHidden={searchByCampaignId}
            page={data.page}
            count={data.count}
            pageSize={data.page_size}
            isFetching={isFetching}
            onChange={onChangeHandler}
          />
        </CardContent>
        <CampaignTableWrapperContext.Provider
          value={{ addCloneToListHandler, updateItemToCampaignList }}
        >
          <div className="global-table-responsive">
            <Table>
              <TableHeadMainSort
                disabledSort={searchByCampaignId}
                isFetching={isFetching}
                rows={tableHeaderRows}
                onChange={onChangeHandler}
              />
              <CampaignTableBody
                cols={tableHeaderRows.length}
                isFetching={isFetching}
                data={data.response}
              />
            </Table>
          </div>
        </CampaignTableWrapperContext.Provider>
      </>
    );
  }, [
    addCloneToListHandler,
    data,
    error,
    isFetching,
    onChangeHandler,
    searchByCampaignId,
    tableHeaderRows,
    updateItemToCampaignList,
  ]);
}

export default CampaignTableWrapper;
