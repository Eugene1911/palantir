import React from 'react';
import { inject, observer } from 'mobx-react';
import Accordion from 'sharedComponents/Accordion';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import createTabs from './services/createTabs';
import IDTableController from './widgets/IDTable';
import {
  EIDModel,
  ETrafficSource,
  ETrafficType,
  trafficSources,
  trafficTypes,
} from './assets/constants/commonAudienceTypes';
import { EFetchStatus } from '../../assets/commonTypes';

interface IAudience {
  getSpotsData?: () => void;
  getSitesData?: () => void;
  spotsFetchStatus?: EFetchStatus;
  sitesFetchStatus?: EFetchStatus;
  toggleIsAdvancedOpen?: () => void;
  isAdvancedOpen?: boolean;
  trafficType?: ETrafficType;
  trafficSource?: ETrafficSource;
}

function Audience(props?: IAudience): JSX.Element {
  const {
    getSpotsData,
    getSitesData,
    spotsFetchStatus,
    sitesFetchStatus,
    isAdvancedOpen,
    toggleIsAdvancedOpen,
    trafficType,
    trafficSource,
  } = props;
  const tabs = createTabs({
    isAdvancedOpen,
    toggleIsAdvancedOpen,
    trafficType,
  });

  spotsFetchStatus === EFetchStatus.NOT_FETCHED && getSpotsData();
  sitesFetchStatus === EFetchStatus.NOT_FETCHED && getSitesData();

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
  spotsFetchStatus:
    CampaignAudienceAndPricingStore.audience[EIDModel.SPOT_ID]
      .fetchStatus,
  sitesFetchStatus:
    CampaignAudienceAndPricingStore.audience[EIDModel.SITE_ID]
      .fetchStatus,
  isAdvancedOpen:
    CampaignAudienceAndPricingStore.audience.isAdvancedOpen,
  toggleIsAdvancedOpen:
    CampaignAudienceAndPricingStore.audience.toggleIsAdvancedOpen,
  trafficType: CampaignAudienceAndPricingStore.audience.trafficType,
  trafficSource:
    CampaignAudienceAndPricingStore.audience.trafficSource,
}))(observer(Audience));
