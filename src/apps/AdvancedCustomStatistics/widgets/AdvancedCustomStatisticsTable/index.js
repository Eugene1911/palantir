import React from 'react';
import { observer, inject } from 'mobx-react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { LOAD_STATES } from 'config/constants';
import TableLoader from 'sharedComponents/loaders/TableLoader';
import TableHeadMainSort from 'sharedComponents/TableHeadMainSort';
import statsDataProcessing from 'helpers/statistic/processing';
import tableScheme from './tableScheme';

function AdvancedCustomStatisticsTable({
  advancedCustomStatisticsStore,
}) {
  const { statsList, statsListState } = advancedCustomStatisticsStore;
  const isPending = statsListState === LOAD_STATES.PENDING;
  const finishData = statsDataProcessing(statsList, tableScheme);
  console.log('statsList', finishData);

  return (
    <Table>
      <TableHeadMainSort
        onChange={() => {}}
        isFetching={isPending}
        rows={tableScheme}
      />
      {isPending ? (
        <TableLoader cols={tableScheme.length} />
      ) : (
        <TableBody>
          {finishData.map((data, index) => (
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

export default inject('advancedCustomStatisticsStore')(
  observer(AdvancedCustomStatisticsTable),
);
