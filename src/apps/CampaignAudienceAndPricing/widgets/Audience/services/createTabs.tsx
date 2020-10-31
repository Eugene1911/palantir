import React from 'react';
import { ITab } from 'sharedComponents/Accordion';
import CampaignFormLabel from 'sharedComponents/CampaignFormLabel';
import { leftSidesConst } from '../assets/constants/leftSidesConst';
import TrafficSelectionButtons from '../widgets/trafficSelectionButtons';
import IDSelector from '../widgets/IDSelector';
import { EIDModel } from '../assets/constants/commonAudienceTypes';

function createTabs(): ITab[] {
  return [
    {
      leftSide: (
        <CampaignFormLabel
          text={leftSidesConst.trafficSelection.title}
          tooltipText={leftSidesConst.trafficSelection.tooltip}
        />
      ),
      rightSide: <TrafficSelectionButtons />,
    },
    {
      leftSide: (
        <CampaignFormLabel
          text={leftSidesConst.siteID.title}
          tooltipText={leftSidesConst.siteID.tooltip}
        />
      ),
      rightSide: <IDSelector model={EIDModel.SITE_ID} />,
    },
    {
      leftSide: (
        <CampaignFormLabel
          text={leftSidesConst.spotID.title}
          tooltipText={leftSidesConst.spotID.tooltip}
        />
      ),
      rightSide: <IDSelector model={EIDModel.SPOT_ID} />,
    },
    {
      leftSide: (
        <CampaignFormLabel
          text={leftSidesConst.subID.title}
          tooltipText={leftSidesConst.subID.tooltip}
        />
      ),
      rightSide: <IDSelector model={EIDModel.SUB_ID} />,
    },
  ];
}

export default createTabs;
