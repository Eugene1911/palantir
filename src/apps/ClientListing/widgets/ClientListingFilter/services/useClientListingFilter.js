import { useEffect, useState } from 'react';

function useClientListingFilter({
  requestFromFilter,
  requestParams,
  filterStore,
}) {
  const [clientFilterState, setClientFilterState] = useState(
    requestParams,
  );
  const onSubmitFilterHandler = event => {
    event.preventDefault();

    requestFromFilter(clientFilterState);
  };
  const onChangeClientFilterFielsHandler = ({ target }) => {
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
