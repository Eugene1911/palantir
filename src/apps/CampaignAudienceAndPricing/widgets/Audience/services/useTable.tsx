import React from 'react';
import union from 'lodash/union';
import {
  TAudienceModel,
  TSite,
  TSpot,
} from '../stores/AudienceStore';
import {
  EIDModel,
  ETrafficType,
} from '../assets/constants/commonAudienceTypes';

interface IUseTableProps {
  audience: TAudienceModel;
  isCustomSpot?: boolean;
}

export const useTable = (props: IUseTableProps) => {
  const { audience, isCustomSpot } = props;

  const [selectedSites, setSelectedSites] = React.useState<TSite[]>(
    audience.selectedSites,
  );
  const [selectedSpots, setSelectedSpots] = React.useState<TSpot[]>(
    audience.selectedSpots,
  );

  const baseSpots = React.useMemo(() => {
    return audience.trafficType === ETrafficType.RON || isCustomSpot
      ? selectedSpots
      : audience[EIDModel.SPOT_ID].spots;
  }, [audience.trafficType, audience.selectedSpots, isCustomSpot]);

  const [filteredSites, setFilteredSites] = React.useState<TSite[]>(
    selectedSites,
  );
  const [filteredSpots, setFilteredSpots] = React.useState<TSpot[]>(
    baseSpots,
  );

  React.useEffect(() => {
    setFilteredSpots(baseSpots);
  }, [baseSpots]);

  const getFilterTextArray = (inputText: string): string[] => {
    const textArray = !!inputText && inputText.split(',');
    return union(
      textArray.map(word => word.trim()),
      [],
    );
  };

  const filterSites = (textArray: string[]): void => {
    setFilteredSites(
      selectedSites.filter(
        site =>
          textArray.includes(String(site.id)) ||
          textArray.includes(String(site.domain)),
      ),
    );
  };

  const filterSpots = (textArray: string[]): void => {
    setFilteredSpots(
      baseSpots.filter(
        spot =>
          textArray.includes(String(spot.id)) ||
          textArray.includes(String(spot.domain)) ||
          textArray.includes(String(spot.siteID)),
      ),
    );
  };

  const deselectAll = React.useCallback(() => {
    setSelectedSpots([]);
  }, [setSelectedSpots]);

  const selectSpot = React.useCallback(
    (spot: TSpot) => {
      setSelectedSpots([...selectedSpots, spot]);
    },
    [setSelectedSpots, selectedSpots],
  );

  const selectAll = React.useCallback(() => {
    setSelectedSpots(baseSpots);
  }, [baseSpots, setSelectedSpots]);

  const isSelected = React.useCallback(
    (spot: TSpot) => selectedSpots.includes(spot),
    [selectedSpots],
  );

  const setBid = React.useCallback(
    (value: string, spotID: string): void => {
      audience.setSpotBid(value, spotID);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const preventDefault = (event: React.SyntheticEvent): void =>
    event.preventDefault();

  return {
    baseSpots,
    selectedSites,
    setSelectedSites,
    selectedSpots,
    setSelectedSpots,
    filteredSites,
    setFilteredSites,
    filteredSpots,
    setFilteredSpots,
    deselectAll,
    selectAll,
    selectSpot,
    isSelected,
    setBid,
    filterSites,
    filterSpots,
    getFilterTextArray,
    preventDefault,
  };
};
