import { useEffect } from 'react';
import { LOAD_STATES } from 'config/constants';

function useClientListingTable({
  clientsListState,
  setRequestGetClients,
  getClientList,
  clientsList,
  clientsListPages,
}) {
  const isPending = clientsListState === LOAD_STATES.PENDING;

  useEffect(() => {
    getClientList();
  }, [getClientList]);

  return {
    isPending,
    setRequestGetClients,
    clientsList,
    clientsListPages,
  };
}

export default useClientListingTable;
