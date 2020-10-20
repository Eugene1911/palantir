import React from 'react';
import { ITab } from 'sharedComponents/Accordion';
import { Typography } from '@material-ui/core';
import { AnyFunction } from 'sharedTypes';
import { leftSidesConst } from '../constants/leftSidesConst';
import TrafficSelectionButtons from '../../components/trafficSelectionButtons';
import { ETrafficType } from '../constants/trafficTypes';

export interface ICreateTabsParams {
  scheme: ETrafficType;
  onTrafficTypeChange: AnyFunction;
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
