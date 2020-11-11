import React from 'react';
import { TAudienceModel, TSpot } from '../../stores/AudienceStore';
import { EIDModel } from '../../assets/constants/commonAudienceTypes';
import { EFetchStatus } from '../../../../assets/commonTypes';

interface IUsePrimeTableProps {
  audience: TAudienceModel;
  selectedSpots: TSpot[];
  setSelectedSpots: (spots: TSpot[]) => void;
  setFilteredSpots: (spots: TSpot[]) => void;
  getFilterTextArray: (inputText: string) => string[];
  filterSpots: (textArray: string[]) => void;
}

export const usePrimeTable = (props: IUsePrimeTableProps) => {
  const {
    audience,
    selectedSpots,
    setFilteredSpots,
    setSelectedSpots,
    getFilterTextArray,
    filterSpots,
  } = props;

  const siteFetchStatus = audience[EIDModel.SITE_ID].fetchStatus;
  const spotFetchStatus = audience[EIDModel.SPOT_ID].fetchStatus;
  const isFetchSuccess = React.useMemo(
    () =>
      siteFetchStatus === EFetchStatus.SUCCESS &&
      spotFetchStatus === EFetchStatus.SUCCESS,
    [siteFetchStatus, spotFetchStatus],
  );

  const updateSelected = React.useCallback(() => {
    if (isFetchSuccess) {
      setSelectedSpots(audience.selectedSpots);
      setFilteredSpots(audience.selectedSpots);
    }
  }, [
    audience.selectedSpots,
    isFetchSuccess,
    setFilteredSpots,
    setSelectedSpots,
  ]);

  const updateFiltered = React.useCallback(
    (inputText: string) => {
      inputText.length
        ? filterSpots(getFilterTextArray(inputText))
        : setFilteredSpots(selectedSpots);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedSpots],
  );

  return {
    updateSelected,
    updateFiltered,
  };
};
