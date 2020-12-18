import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import Accordion from 'sharedComponents/Accordion';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import AccessControl from 'helpers/accessControl/controller';
import createTabs, {
  IAudiencePermissions,
} from './services/createTabs';
import IDTableController from './widgets/IDTable';
import {
  accordionTitle,
  EIDModel,
  ETrafficSource,
  ETrafficType,
  trafficSources,
  trafficTypes,
} from './assets/constants/commonAudienceTypes';
import {
  EFetchStatus,
  IAudienceResultData,
} from '../../assets/commonTypes';
import { getCampaigns } from '../../../../resources/api';

interface IAudienceProps {
  getSpotsData?: (format?: number) => void;
  // getSitesData?: () => void;
  getFormats?: () => void;
  // currentFormat?: number;
  formatFetchStatus?: EFetchStatus;
  spotsFetchStatus?: EFetchStatus;
  // sitesFetchStatus?: EFetchStatus;
  toggleIsAdvancedOpen?: () => void;
  isAdvancedOpen?: boolean;
  trafficType?: ETrafficType;
  trafficSource?: ETrafficSource;
  initialCampaignData?: IAudienceResultData;
  setAudienceData?: (data: IAudienceResultData) => void;
}

function Audience(props: IAudienceProps): JSX.Element {
  const {
    getSpotsData,
    // getSitesData,
    getFormats,
    formatFetchStatus,
    spotsFetchStatus,
    // sitesFetchStatus,
    isAdvancedOpen,
    toggleIsAdvancedOpen,
    trafficType,
    trafficSource,
    initialCampaignData,
    setAudienceData,
    // currentFormat,
  } = props;

  const [needSetData, setNeedSetData] = React.useState(false);

  const [permissions, setPermissions] = useState<
    IAudiencePermissions
  >({
    isMembersAreaAvailable: false,
    isSubIDAvailable: false,
    isTrafficSourceAvailable: false,
    isRTBAvailable: false,
  });

  const getAudiencePermissions = async () => {
    const [
      isMembersAreaAvailable,
      isSubIDAvailable,
      isTrafficSourceAvailable,
      isRTBAvailable,
      campaigns,
    ] = await Promise.all([
      AccessControl.canUseTrafficTypeMembersArea(),
      AccessControl.canUseSubID(),
      AccessControl.canUseTrafficSource(),
      AccessControl.canUseRtb(),
      getCampaigns({ page: 10 }),
    ]);

    console.log('campaigns', campaigns.data.response);
    setPermissions({
      isMembersAreaAvailable,
      isSubIDAvailable,
      isTrafficSourceAvailable,
      isRTBAvailable,
    });
  };

  useEffect(() => {
    getAudiencePermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      !initialCampaignData &&
      spotsFetchStatus === EFetchStatus.NOT_FETCHED
    ) {
      getSpotsData();
    }

    if (
      initialCampaignData &&
      spotsFetchStatus === EFetchStatus.SUCCESS
    ) {
      if (!needSetData) {
        getSpotsData(initialCampaignData.format_id);
        setNeedSetData(true);
      } else {
        setAudienceData(initialCampaignData);
      }
    }
  }, [initialCampaignData, spotsFetchStatus, needSetData]);

  const tabs = createTabs({
    isAdvancedOpen,
    toggleIsAdvancedOpen,
    trafficType,
    permissions,
  });

  formatFetchStatus === EFetchStatus.NOT_FETCHED && getFormats();

  return (
    <>
      <Accordion
        title={accordionTitle}
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

export default inject(({ CampaignAudienceAndPricingStore }) => {
  const { audience } = CampaignAudienceAndPricingStore;

  return {
    getSpotsData: audience.getSpotsData,
    // getSitesData: audience.getSitesData,
    // currentFormat: audience.formats.currentFormat,
    getFormats: audience.getFormats,
    formatFetchStatus: audience.formats.fetchStatus,
    spotsFetchStatus: audience[EIDModel.SPOT_ID].fetchStatus,
    // sitesFetchStatus: audience[EIDModel.SITE_ID].fetchStatus,
    isAdvancedOpen: audience.isAdvancedOpen,
    toggleIsAdvancedOpen: audience.toggleIsAdvancedOpen,
    trafficType: audience.trafficType,
    trafficSource: audience.trafficSource,
    setAudienceData: audience.setAudienceData,
  };
})(observer(Audience));
