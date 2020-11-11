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
}

export const useTable = (props: IUseTableProps) => {
  const { audience } = props;

  const [selectedSites, setSelectedSites] = React.useState<TSite[]>(
    audience.selectedSites,
  );
  const [selectedSpots, setSelectedSpots] = React.useState<TSpot[]>(
    audience.selectedSpots,
  );

  const baseSpots =
    audience.trafficType === ETrafficType.RON
      ? selectedSpots
      : audience[EIDModel.SPOT_ID].spots;

  const [filteredSites, setFilteredSites] = React.useState<TSite[]>(
    selectedSites,
  );
  const [filteredSpots, setFilteredSpots] = React.useState<TSpot[]>(
    baseSpots,
  );

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
    filterSites,
    filterSpots,
    getFilterTextArray,
    preventDefault,
  };
};
