import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import useTableHeadMainSortState from './useTableHeadMainSortState';

function TableHeadMainSort({
  rows,
  onChange,
  isFetching,
  disabledSort,
}) {
  const {
    direction,
    orderBy,
    onChangeOrderHandler,
  } = useTableHeadMainSortState(onChange);

  return (
    <TableHead>
      <TableRow>
        {rows.map(({ id, style, label, numeric, order }) => (
          <TableCell
            style={style}
            key={id}
            align={numeric ? 'right' : 'left'}
            sortDirection={orderBy === id ? direction : false}
          >
            {order && !disabledSort ? (
              <TableSortLabel
                active={orderBy === id}
                disabled={isFetching}
                direction={direction}
                onClick={() => onChangeOrderHandler(id)}
              >
                {label}
              </TableSortLabel>
            ) : (
              label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

TableHeadMainSort.propTypes = {
  disabledSort: PropTypes.bool,
  isFetching: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TableHeadMainSort.defaultProps = {
  disabledSort: false,
};

export default TableHeadMainSort;
