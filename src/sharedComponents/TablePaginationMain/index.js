import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const classes = useStyles();
  const START_PAGE_FROM_ZERO = 1;

  if (isFetching) {
    return <PaginationLoader />;
  }

  return (
    <TablePagination
      labelRowsPerPage={t('common:pagination.rows_per_page')}
      component="div"
      className={isHidden ? classes.hidden : ''}
      page={page - START_PAGE_FROM_ZERO}
      count={count}
      rowsPerPage={pageSize}
      rowsPerPageOptions={PAGINATIONS_ROWS_PER_PAGE}
      onChangeRowsPerPage={(event, { props }) =>
        onChange({ size: props.value })
      }
      onChangePage={(event, currentPage) =>
        onChange({ page: currentPage + START_PAGE_FROM_ZERO })
      }
    />
  );
}

TablePaginationMain.propTypes = {
  count: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  isHidden: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  page: PropTypes.number,
  pageSize: PropTypes.number,
};
TablePaginationMain.defaultProps = {
  page: 0,
  count: 0,
  pageSize: 0,
  isHidden: false,
};

export default TablePaginationMain;
