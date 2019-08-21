import { useState, useContext } from 'react';
import {
  TABLE_SORT_DIRECTION_DESCENDING,
  TABLE_SORT_DIRECTION_ASCEDENT,
} from 'config/constants';
import { CampaignListAppContext } from '../../../services/CampaignListAppContext';

const defaultOrderState = {
  orderDirection: TABLE_SORT_DIRECTION_DESCENDING,
  orderBy: null,
};

function getDefaultOrderState({ order }) {
  if (order) {
    const isDesc = order.charAt(0) === '-';

    return {
      orderDirection: isDesc
        ? TABLE_SORT_DIRECTION_ASCEDENT
        : TABLE_SORT_DIRECTION_DESCENDING,
      orderBy: isDesc ? order.substr(1) : order,
    };
  }

  return defaultOrderState;
}

function useCampaignTableState() {
  const {
    campaignListAppReducerState,
    campaignListAppStateDispatch,
  } = useContext(CampaignListAppContext);
  const [orderState, setOrderState] = useState(
    getDefaultOrderState(campaignListAppReducerState),
  );
  const { orderDirection, orderBy } = orderState;
  const handleRequestSort = (event, property) => {
    const isDesc =
      orderBy === property &&
      orderDirection === TABLE_SORT_DIRECTION_DESCENDING;

    setOrderState({
      orderDirection: isDesc
        ? TABLE_SORT_DIRECTION_ASCEDENT
        : TABLE_SORT_DIRECTION_DESCENDING,
      orderBy: property,
    });

    campaignListAppStateDispatch({
      ...campaignListAppReducerState,
      order: isDesc ? `-${property}` : property,
    });
  };
  const onOrderChangeHandler = property => event => {
    handleRequestSort(event, property);
  };

  return {
    orderDirection,
    orderBy,
    onOrderChangeHandler,
  };
}

export default useCampaignTableState;
