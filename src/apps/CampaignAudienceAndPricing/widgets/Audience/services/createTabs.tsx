import React from 'react';
import uuid from 'react-uuid';
import { ITab } from 'sharedComponents/Accordion';
import OpenAdvancedTabsButton from 'sharedComponents/OpenAdvancedTabsButton';
import CampaignFormLabel from 'sharedComponents/CampaignFormLabel';
import TrafficSelectionButtons from '../widgets/trafficSelectionButtons';
import IDSelector from '../widgets/IDSelector';
import TrafficSourceSelector from '../widgets/trafficSourceSelector';
import RTBSelector from '../widgets/RTBSelector';
import PrimeTable from '../widgets/PrimeTable';
import { leftSidesConst } from '../assets/constants/leftSidesConst';
import {
  EIDModel,
  ETrafficType,
} from '../assets/constants/commonAudienceTypes';
// eslint-disable-next-line import/namespace

export interface IAudiencePermissions {
  isMembersAreaAvailable: boolean;
  isSubIDAvailable: boolean;
  isTrafficSourceAvailable: boolean;
  isRTBAvailable: boolean;
}

interface ICreateTabsProps {
  toggleIsAdvancedOpen?: () => void;
  isAdvancedOpen: boolean;
  trafficType?: ETrafficType;
  permissions: IAudiencePermissions;
}

function createTabs(
  props: ICreateTabsProps,
): Array<ITab | JSX.Element> {
  const {
    isAdvancedOpen,
    toggleIsAdvancedOpen,
    trafficType,
    permissions,
  } = props;
  const {
    isMembersAreaAvailable,
    isSubIDAvailable,
    isTrafficSourceAvailable,
    isRTBAvailable,
  } = permissions;

  const tabs: Array<ITab | JSX.Element> = [
    {
      leftSide: (
        <CampaignFormLabel
          text={leftSidesConst.trafficSelection.title}
          tooltipText={leftSidesConst.trafficSelection.tooltip}
        />
      ),
      rightSide: (
        <TrafficSelectionButtons
          isMembersAreaAvailable={isMembersAreaAvailable}
        />
      ),
    },
  ];
  if (trafficType === ETrafficType.RON) {
    tabs.push(
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
    );

    isSubIDAvailable &&
      tabs.push({
        leftSide: (
          <CampaignFormLabel
            text={leftSidesConst.subID.title}
            tooltipText={leftSidesConst.subID.tooltip}
          />
        ),
        rightSide: <IDSelector model={EIDModel.SUB_ID} />,
      });

    isTrafficSourceAvailable &&
      tabs.push({
        leftSide: (
          <CampaignFormLabel
            text={leftSidesConst.trafficSource.title}
            tooltipText={leftSidesConst.trafficSource.tooltip}
          />
        ),
        rightSide: <TrafficSourceSelector />,
      });

    if (isRTBAvailable) {
      tabs.push(
        <OpenAdvancedTabsButton
          key={uuid()}
          toggleIsAdvancedOpen={toggleIsAdvancedOpen}
          isAdvancedOpen={isAdvancedOpen}
        />,
      );
      isAdvancedOpen &&
        tabs.push({
          leftSide: (
            <CampaignFormLabel text={leftSidesConst.rtb.title} />
          ),
          rightSide: <RTBSelector />,
        });
    }
  } else {
    tabs.push(<PrimeTable />);
  }

  return tabs;
}

export default createTabs;
