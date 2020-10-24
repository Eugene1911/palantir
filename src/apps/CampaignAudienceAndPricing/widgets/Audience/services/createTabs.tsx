import React from 'react';
import { ITab } from 'sharedComponents/Accordion';
import CampaignFormLabel from 'sharedComponents/CampaignFormLabel';
import { leftSidesConst } from '../assets/constants/leftSidesConst';
import TrafficSelectionButtons from '../components/trafficSelectionButtons';
import { ETrafficType } from '../assets/constants/commonAudienceTypes';
// import IDSelector from '../components/IDSelector';

export interface ICreateTabsParams {
  trafficType: ETrafficType;
  onTrafficTypeChange: (index: number) => void;
}

function createTabs(params: ICreateTabsParams): ITab[] {
  const { trafficType, onTrafficTypeChange } = params;
  return [
    {
      leftSide: (
        <CampaignFormLabel
          text={leftSidesConst.trafficSelection.title}
          tooltipText={leftSidesConst.trafficSelection.tooltip}
        />
      ),
      rightSide: TrafficSelectionButtons({
        selected: trafficType,
        onChange: onTrafficTypeChange,
      }),
    },
    {
      leftSide: (
        <CampaignFormLabel
          text={leftSidesConst.siteID.title}
          tooltipText={leftSidesConst.siteID.tooltip}
        />
      ),
      rightSide: <></>, // IDSelector(),
    },
  ];
}

export default createTabs;
