import React from 'react';
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';
import { PAGINATIONS_ROWS_PER_PAGE } from 'config/constants';
import PaginationLoader from '../loaders/PaginationLoader';
import useStyles from './styles';

function TablePaginationMain({
  page,
  count,
  pageSize,
  isFetching,
  onChange,
  isHidden,
}) {
  const classes = useStyles();

  if (isFetching) {
    return <PaginationLoader />;
  }

  return (
    <TablePagination
      component='div'
      className={isHidden ? classes.hidden : ''}
      page={page}
      count={count}
      rowsPerPage={pageSize}
      rowsPerPageOptions={PAGINATIONS_ROWS_PER_PAGE}
      onChangeRowsPerPage={(event, { props }) =>
        onChange({ size: props.value })
      }
      onChangePage={(event, currentPage) =>
        onChange({ page: currentPage })
      }
    />
  );
}

TablePaginationMain.propTypes = {
  page: PropTypes.number,
  count: PropTypes.number,
  isHidden: PropTypes.bool,
  pageSize: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
TablePaginationMain.defaultProps = {
  page: 0,
  count: 0,
  pageSize: 0,
  isHidden: false,
};

export default TablePaginationMain;
