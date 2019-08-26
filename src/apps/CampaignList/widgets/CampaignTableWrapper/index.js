import React, { useMemo } from 'react';
import Table from '@material-ui/core/Table';
import NoData from 'sharedComponents/NoData';
import TablePaginationMain from 'sharedComponents/TablePaginationMain';
import TableHeadMainSort from 'sharedComponents/TableHeadMainSort';
import CardContent from '@material-ui/core/CardContent';
import CampaignTableBody from '../CampaignTableBody';
import useCampaignListAppReducer from './services/useCampaignListAppReducer';
import tableHeaderRows from './tableHeaderRows';

function CampaignTableWrapper() {
  const {
    isFetching,
    error,
    data,
    searchByCampaignId,
    onChangeHandler,
  } = useCampaignListAppReducer();

  return useMemo(() => {
    if (error) {
      return <NoData title={error.msg} />;
    }

    if ((!isFetching && !data) || (!!data && !data.response)) {
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
      </>
    );
  }, [data, error, isFetching, onChangeHandler, searchByCampaignId]);
}

export default CampaignTableWrapper;
