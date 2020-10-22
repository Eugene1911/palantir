import React from 'react';
import { ITab } from 'sharedComponents/Accordion';
import { AnyFunction } from 'sharedTypes';
import CampaignFormLabel from 'sharedComponents/CampaignFormLabel';
import { leftSidesConst } from '../constants/leftSidesConst';
import TrafficSelectionButtons from '../../components/trafficSelectionButtons';
import { ETrafficType } from '../constants/trafficTypes';

export interface ICreateTabsParams {
  scheme: ETrafficType;
  onTrafficTypeChange: AnyFunction;
}

function createTabs(params: ICreateTabsParams): ITab[] {
  const { scheme, onTrafficTypeChange } = params;
  return [
    {
      leftSide: (
        <CampaignFormLabel
          text={leftSidesConst.trafficSelection.title}
          tooltipText={leftSidesConst.trafficSelection.title}
        />
      ),
      rightSide: TrafficSelectionButtons({
        selected: scheme,
        onChange: onTrafficTypeChange,
      }),
    },
  ];
}

export default createTabs;
