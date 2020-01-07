import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableLoader from 'sharedComponents/loaders/TableLoader';
import TableHeadMainSort from 'sharedComponents/TableHeadMainSort';
import { LOAD_STATES } from 'config/constants';

function AdvancedCustomStatisticsTable({
  statsList,
  tableScheme,
  statsListState,
  isLoadingStatsByOrder,
  onChangeOrderHandler,
}) {
  const isPending =
    isLoadingStatsByOrder || statsListState === LOAD_STATES.PENDING;

  return (
    <Table>
      <TableHeadMainSort
        onChange={onChangeOrderHandler}
        isFetching={isPending}
        rows={tableScheme}
      />
      {isPending ? (
        <TableLoader cols={tableScheme.length} />
      ) : (
        <TableBody>
          {statsList.map((data, index) => (
            <TableRow key={Symbol(index).toString()}>
              {tableScheme.map((sheme, j) => (
                <TableCell
                  key={Symbol(j).toString()}
                  align={sheme.numeric ? 'right' : 'left'}
                >
                  {data[sheme.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}

AdvancedCustomStatisticsTable.propTypes = {
  isLoadingStatsByOrder: PropTypes.bool.isRequired,
  onChangeOrderHandler: PropTypes.func.isRequired,
  statsList: PropTypes.array.isRequired,
  statsListState: PropTypes.string.isRequired,
  tableScheme: PropTypes.array.isRequired,
};

export default inject(({ advancedCustomStatisticsStore }) => ({
  statsList: advancedCustomStatisticsStore.statsList,
  isLoadingStatsByOrder:
    advancedCustomStatisticsStore.isLoadingStatsByOrder,
  statsListState: advancedCustomStatisticsStore.statsListState,
  getStats: advancedCustomStatisticsStore.getStats,
  tableScheme: advancedCustomStatisticsStore.tableScheme,
  onChangeOrderHandler:
    advancedCustomStatisticsStore.filter.onChangeOrderHandler,
}))(AdvancedCustomStatisticsTable);
