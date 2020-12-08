import React from 'react';

export const useCustomSpotTable = () => {
  const [localBids, setLocalBids] = React.useState<{
    [id: string]: string;
  }>({});

  const setBid = (bid: string, id: string): void => {
    setLocalBids(prev => ({ ...prev, [id]: bid }));
  };

  return {
    localBids,
    setLocalBids,
    setBid,
  };
};
