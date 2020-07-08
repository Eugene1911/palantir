import React, { useState, useEffect } from 'react';
import ButtonGroupSelect from 'sharedComponents/ButtonGroupSelect';
import { TCommonFetchingDataType } from 'sharedTypes';

type TFetchingDataLoaderProps = {
  onChange: (value: number) => void;
  value: number;
};

type TFetchData<T> = () => Promise<Array<T>>;

type TUseFetchingDataLoader<T> = {
  isLoading: boolean;
  fetchingData: Array<T>;
};

function useFetchingDataLoader<T>(
  fetchData: TFetchData<T>,
): TUseFetchingDataLoader<T> {
  const [isLoading, setIsloading] = useState(false);
  const [fetchingData, setFetchingData] = useState([]);

  useEffect(() => {
    setIsloading(true);
    fetchData()
      .then((value: Array<T>) => setFetchingData(value))
      .then(() => setIsloading(false))
      .catch(() => setIsloading(false));
  }, [fetchData]);

  return {
    fetchingData,
    isLoading,
  };
}

function withFetchingDataLoader<T extends TCommonFetchingDataType>(
  fetchData: TFetchData<T>,
): React.FunctionComponent<TFetchingDataLoaderProps> {
  return function ButtonGroupSelectFetchingDataLoader(
    props,
  ): JSX.Element {
    const { isLoading, fetchingData } = useFetchingDataLoader<T>(
      fetchData,
    );

    if (isLoading) return <h1>isLoading</h1>;

    if (!fetchingData || !fetchingData.length)
      return <p>No data component</p>;

    return <ButtonGroupSelect data={fetchingData} {...props} />;
  };
}

export default withFetchingDataLoader;
