import React from 'react';
import uuid from 'react-uuid';
import { ITab } from 'sharedComponents/Accordion';
import OpenAdvancedTabsButton from 'sharedComponents/OpenAdvancedTabsButton';
import CampaignFormLabel from 'sharedComponents/CampaignFormLabel';
import TrafficSelectionButtons from '../widgets/trafficSelectionButtons';
import IDSelector from '../widgets/IDSelector';
import { EIDModel } from '../assets/constants/commonAudienceTypes';
import TrafficSourceSelector from '../widgets/trafficSourceSelector';
import RTBSelector from '../widgets/RTBSelector';
import { leftSidesConst } from '../assets/constants/leftSidesConst';

interface ICreateTabsProps {
  toggleIsAdvancedOpen?: () => void;
  isAdvancedOpen: boolean;
}

function createTabs(
  props: ICreateTabsProps,
): Array<ITab | JSX.Element> {
  const { isAdvancedOpen, toggleIsAdvancedOpen } = props;
  const tabs = [
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
    {
      leftSide: (
        <CampaignFormLabel
          text={leftSidesConst.trafficSource.title}
          tooltipText={leftSidesConst.trafficSource.tooltip}
        />
      ),
      rightSide: <TrafficSourceSelector />,
    },
    <OpenAdvancedTabsButton
      key={uuid()}
      toggleIsAdvancedOpen={toggleIsAdvancedOpen}
      isAdvancedOpen={isAdvancedOpen}
    />,
  ];

  if (isAdvancedOpen) {
    tabs.push({
      leftSide: <CampaignFormLabel text={leftSidesConst.rtb.title} />,
      rightSide: <RTBSelector />,
    });
  }

  return tabs;
}

export default createTabs;
