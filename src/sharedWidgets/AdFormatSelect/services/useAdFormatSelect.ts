import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { getFormats } from 'resources/api';
import { TFormatAPI } from 'sharedTypes';

export type TUseAdFormatSelect = {
  adFormats: Array<TFormatAPI>;
  isLoadingAdFormats: boolean;
};

function useAdFormatSelect(): TUseAdFormatSelect {
  const [adFormats, setAdFormats] = useState([]);
  const [isLoadingAdFormats, setIsLoadingAdFormats] = useState(false);

  useEffect(() => {
    setIsLoadingAdFormats(true);
    getFormats({})
      .then(({ data }: AxiosResponse<Array<TFormatAPI>>) =>
        data.filter(({ hidden }) => !hidden),
      )
      .then((adFormatList: Array<TFormatAPI>) =>
        setAdFormats(adFormatList),
      )
      .then(() => setIsLoadingAdFormats(false))
      .catch(() => setIsLoadingAdFormats(false));
  }, []);

  return {
    adFormats,
    isLoadingAdFormats,
  };
}

export default useAdFormatSelect;
