import { useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

const NEAR_TO_BOTTOM = 60;

export const useFetchMoreInModal = (fetchMore: () => void) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container: HTMLDivElement | null = listRef.current;
    const handler = debounce(() => {
      if (container) {
        const wantToLoadMore: boolean =
          container.scrollTop +
            NEAR_TO_BOTTOM +
            +container.offsetHeight >=
          container.scrollHeight;
        if (wantToLoadMore) {
          fetchMore();
        }
      }
    }, 100);

    if (container) {
      container.addEventListener('scroll', handler);
    }
    return (): void => {
      if (container) {
        container.removeEventListener('scroll', handler);
      }
    };
  }, [fetchMore]);

  return { listRef };
};
