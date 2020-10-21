import React from 'react';
import { ITab } from 'sharedComponents/Accordion';
import { Typography } from '@material-ui/core';
import { leftSidesConst } from '../assets/constants/leftSidesConst';
import TrafficSelectionButtons from '../components/trafficSelectionButtons';
import { ETrafficType } from '../assets/constants/trafficTypes';

export interface ICreateTabsParams {
  scheme: ETrafficType;
  onTrafficTypeChange: (index: number) => void;
}

function createTabs(params: ICreateTabsParams): ITab[] {
  const { scheme, onTrafficTypeChange } = params;
  const tabs = [
    {
      leftSide: getTrafficSelectionLeftSide(),
      rightSide: TrafficSelectionButtons({
        selected: scheme,
        onChange: onTrafficTypeChange,
      }),
    },
  ];

  return tabs;
}

function getTrafficSelectionLeftSide(): JSX.Element {
  return (
    <>
      <Typography>{leftSidesConst.trafficSelection.title}</Typography>
    </>
  );
}

export default createTabs;
