import React from 'react';
import { ITab } from 'sharedComponents/Accordion';
import CampaignFormLabel from 'sharedComponents/CampaignFormLabel';
import { leftSidesConst } from '../assets/constants/leftSidesConst';
import TrafficSelectionButtons from '../components/trafficSelectionButtons';
import { ETrafficType } from '../assets/constants/trafficTypes';

export interface ICreateTabsParams {
  scheme: ETrafficType;
  onTrafficTypeChange: (index: number) => void;
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
