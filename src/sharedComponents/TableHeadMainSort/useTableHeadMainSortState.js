import { useState } from 'react';

function useTableHeadMainSortState(onChange) {
  const [direction, setDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const onChangeOrderHandler = orderName => {
    const newOrder = direction === 'asc' ? 'desc' : 'asc';
    const order = newOrder === 'asc' ? `-${orderName}` : orderName;

    setOrderBy(orderName);
    setDirection(newOrder);
    onChange({ order });
  };

  return {
    direction,
    orderBy,
    onChangeOrderHandler,
  };
}

export default useTableHeadMainSortState;
