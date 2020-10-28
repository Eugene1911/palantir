import React from 'react';
import { useTranslation } from 'react-i18next';

import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import IconButton from '@material-ui/core/IconButton';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import TableHeadMainSort from 'sharedComponents/TableHeadMainSort';
import { TOptimizerStrategy } from 'sharedTypes';
import TableLoader from 'sharedComponents/loaders/TableLoader';
import dateFnsFormat from 'helpers/dateFnsFormat';
import useStores from 'apps/Optimizers/store';
import NoData from 'sharedComponents/NoData';
import { Link, useRouteMatch } from 'react-router-dom';
import { DATE_DETAIL_FORMAT } from 'config/constants';
import useTableHeaderRows from './tableHeaderRows';

type TOptimizersTable = {
  data: Array<TOptimizerStrategy>;
  isLoading: boolean;
};

function OptimizersTable({
  data,
  isLoading,
}: TOptimizersTable): JSX.Element {
  const { path } = useRouteMatch();
  const { t } = useTranslation('optimizers');
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const tableHeaderRows = useTableHeaderRows();
  const { optimizersListStore } = useStores();
  const { onChangeSortHandler } = optimizersListStore;
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const handleClick = (event: any): void => {
  //   setAnchorEl(event.currentTarget);
  // };

  if (!isLoading && !data.length) return <NoData />;

  return (
    <Table className="global-content-table">
      <TableHeadMainSort
        onChange={onChangeSortHandler}
        isFetching={isLoading}
        rows={tableHeaderRows}
      />
      {isLoading ? (
        <TableLoader cols={tableHeaderRows.length} />
      ) : (
        <TableBody>
          {data.map(item => (
            <TableRow key={item.id}>
              <TableCell>
                <Link to={`${path}/edit/${item.id}`}>
                  {item.title}
                </Link>
              </TableCell>
              <TableCell>{item.default_time_interval}</TableCell>
              <TableCell>
                {item.sources && item.sources.join(', ')}
              </TableCell>
              <TableCell>
                {item.rule_count} {t('optimizers:table:rules')}
              </TableCell>
              <TableCell>
                {dateFnsFormat(item.updated_at, DATE_DETAIL_FORMAT)}
              </TableCell>
              <TableCell align="right">
                {item.campaign_count || 0}
              </TableCell>
              {/* <TableCell align="right">
                <div>
                  <IconButton
                    onClick={handleClick}
                    aria-haspopup="true"
                    aria-controls="menu"
                    size="small"
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    keepMounted
                    open={Boolean(anchorEl)}
                    id="menu"
                  >
                    <MenuItem>Edit</MenuItem>
                  </Menu>
                </div>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}

export default OptimizersTable;
