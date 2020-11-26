import React from 'react';
import { ITab } from 'sharedComponents/Accordion';
import CampaignFormLabel from 'sharedComponents/CampaignFormLabel';
import OpenAdvancedTabsButton from 'sharedComponents/OpenAdvancedTabsButton';
import Countries from '../widgets/Countries';
import Carriers from '../widgets/Carriers';
import Browsers from '../widgets/Browsers';
import OperatingSystems from '../widgets/OperatingSystems';
import DeviceBrands from '../widgets/DeviceBrands';
import Languages from '../widgets/Languages';
import Devices from '../widgets/Devices';
import ModelPrice from '../widgets/ModelPrice';
import DeviceReleaseDate from '../widgets/DeviceReleaseDate';
import Retargeting from '../widgets/Retargeting';
import ProxyTraffic from '../widgets/ProxyTraffic';
import IPRanges from '../widgets/IPRanges';
import Keywords from '../widgets/Keywords';

const proxyTrafficTab: ITab[] = [
  {
    leftSide: <CampaignFormLabel text="Proxy traffic type" />,
    rightSide: <ProxyTraffic />,
  },
];

const keywordsTab: ITab[] = [
  {
    leftSide: (
      <CampaignFormLabel
        text="Keywords"
        tooltipText={
          'To target specific keywords, you can paste the words ' +
          'separated by a comma and save your ad campaign. Or you can ' +
          'type a keyword and press "Enter" to add it to the targeting.'
        }
      />
    ),
    rightSide: <Keywords />,
  },
];

const advancedTabs = (
  canUseKeywords: boolean,
): Array<ITab | JSX.Element> => [
  {
    leftSide: <CampaignFormLabel text="IP ranges" />,
    rightSide: <IPRanges />,
  },
  ...(canUseKeywords ? keywordsTab : []),
  {
    leftSide: <CampaignFormLabel text="Retargeting" />,
    rightSide: <Retargeting />,
  },
];

const devicesTabs: ITab[] = [
  {
    leftSide: <CampaignFormLabel text="Device brands and models" />,
    rightSide: <DeviceBrands />,
  },
  {
    leftSide: <CampaignFormLabel text="Device release date" />,
    rightSide: <DeviceReleaseDate />,
  },
  {
    leftSide: (
      <CampaignFormLabel
        text="Model price"
        tooltipText="You can target devices depending on their retail price range on the day they were released."
      />
    ),
    rightSide: <ModelPrice />,
  },
];

export const tabs = (
  isAdvancedOpen: boolean,
  toggleIsAdvancedOpen: () => void,
  canUseDeviceSetting: boolean,
  canUseTrafficSourceType: boolean,
  canUseKeywords: boolean,
): Array<ITab | JSX.Element> => [
  {
    leftSide: <CampaignFormLabel text="Countries and region" />,
    rightSide: <Countries />,
  },
  {
    leftSide: <CampaignFormLabel text="Languages" />,
    rightSide: <Languages />,
  },
  {
    leftSide: <CampaignFormLabel text="Devices" />,
    rightSide: <Devices />,
  },
  ...(canUseDeviceSetting ? devicesTabs : []),
  {
    leftSide: <CampaignFormLabel text="Operating systems" />,
    rightSide: <OperatingSystems />,
  },
  {
    leftSide: <CampaignFormLabel text="Browsers" />,
    rightSide: <Browsers />,
  },
  {
    leftSide: <CampaignFormLabel text="Carriers" />,
    rightSide: <Carriers />,
  },
  <OpenAdvancedTabsButton
    isAdvancedOpen={isAdvancedOpen}
    toggleIsAdvancedOpen={toggleIsAdvancedOpen}
    key="openAdvancedTabsButton"
  />,
  ...(isAdvancedOpen && canUseTrafficSourceType
    ? proxyTrafficTab
    : []),
  ...(isAdvancedOpen ? advancedTabs(canUseKeywords) : []),
];
