import React from 'react';
import { inject, observer } from 'mobx-react';
import Accordion from 'sharedComponents/Accordion';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import createTabs from './services/createTabs';
import IDTableController from './widgets/IDTable';
import {
  ETrafficSource,
  ETrafficType,
  trafficTypes,
  trafficSources,
} from './assets/constants/commonAudienceTypes';

interface IAudience {
  getSpotsData?: () => void;
  getSitesData?: () => void;
  toggleIsAdvancedOpen?: () => void;
  isAdvancedOpen?: boolean;
  trafficType?: ETrafficType;
  trafficSource?: ETrafficSource;
}

function Audience(props?: IAudience): JSX.Element {
  const {
    getSpotsData,
    getSitesData,
    isAdvancedOpen,
    toggleIsAdvancedOpen,
    trafficType,
    trafficSource,
  } = props;
  const tabs = createTabs({ isAdvancedOpen, toggleIsAdvancedOpen });

  getSpotsData();
  getSitesData();
  return (
    <>
      <Accordion
        title="Audience"
        Icon={SupervisedUserCircle}
        isSelected
        subInfo1={trafficTypes[trafficType]}
        subInfo2={trafficSources[trafficSource]}
        subInfo3=""
        tabs={tabs}
      />
      <IDTableController />
    </>
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  getSpotsData: CampaignAudienceAndPricingStore.audience.getSpotsData,
  getSitesData: CampaignAudienceAndPricingStore.audience.getSitesData,
  isAdvancedOpen:
    CampaignAudienceAndPricingStore.audience.isAdvancedOpen,
  toggleIsAdvancedOpen:
    CampaignAudienceAndPricingStore.audience.toggleIsAdvancedOpen,
  trafficType: CampaignAudienceAndPricingStore.audience.trafficType,
  trafficSource:
    CampaignAudienceAndPricingStore.audience.trafficSource,
}))(observer(Audience));
