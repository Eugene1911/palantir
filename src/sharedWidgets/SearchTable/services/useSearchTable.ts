import { useState } from 'react';

export type TuseSearchTable = {
  isFocusSearch: boolean;
  onBlurFocusHandler: () => void;
};

function useSearchTable(): TuseSearchTable {
  const [isFocusSearch, setFocusSearch] = useState(false);
  const onBlurFocusHandler = (): void =>
    setFocusSearch(!isFocusSearch);

  return {
    isFocusSearch,
    onBlurFocusHandler,
  };
}

export default useSearchTable;
