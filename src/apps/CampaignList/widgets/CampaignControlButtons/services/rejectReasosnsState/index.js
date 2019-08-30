import { useState } from 'react';

function useRejectReasosnsState() {
  const [
    isOpenDialogRejectReasosns,
    setDialogRejectReasosnsState,
  ] = useState(false);

  return {
    isOpenDialogRejectReasosns,
    setDialogRejectReasosnsState,
  };
}

export default useRejectReasosnsState;
