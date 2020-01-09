import React from 'react';
import { useEffect, useState } from 'react';
import { IClientListingStore } from '../../../stores/ClientListingStore';

function useClientListingFilter({
  requestFromFilter,
  requestParams,
  filterStore,
}: IClientListingStore) {
  const [clientFilterState, setClientFilterState] = useState(
    requestParams,
  );
  const onSubmitFilterHandler = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    requestFromFilter(clientFilterState);
  };
  const onChangeClientFilterFielsHandler = ({ target }: any) => {
    const { name, value } = target;

    setClientFilterState({
      ...clientFilterState,
      ...{
        [name]: value,
      },
    });
  };

  useEffect(() => {
    filterStore.getResources();
  }, [filterStore, filterStore.getResources]);

  return {
    filterStore,
    clientFilterState,
    onSubmitFilterHandler,
    onChangeClientFilterFielsHandler,
  };
}

export default useClientListingFilter;
