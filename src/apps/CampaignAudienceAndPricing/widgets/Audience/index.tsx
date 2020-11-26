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
import { EFetchStatus } from '../../assets/commonTypes';

interface IAudienceProps {
  getSpotsData?: () => void;
  getSitesData?: () => void;
  spotsFetchStatus?: EFetchStatus;
  sitesFetchStatus?: EFetchStatus;
  toggleIsAdvancedOpen?: () => void;
  isAdvancedOpen?: boolean;
  trafficType?: ETrafficType;
  trafficSource?: ETrafficSource;
}

function Audience(props: IAudienceProps): JSX.Element {
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
    ] = await Promise.all([
      AccessControl.canUseTrafficTypeMembersArea(),
      AccessControl.canUseSubID(),
      AccessControl.canUseTrafficSource(),
      AccessControl.canUseRtb(),
    ]);

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

  const tabs = createTabs({
    isAdvancedOpen,
    toggleIsAdvancedOpen,
    trafficType,
    permissions,
  });

  spotsFetchStatus === EFetchStatus.NOT_FETCHED && getSpotsData();
  sitesFetchStatus === EFetchStatus.NOT_FETCHED && getSitesData();

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
    getSitesData: audience.getSitesData,
    spotsFetchStatus: audience[EIDModel.SPOT_ID].fetchStatus,
    sitesFetchStatus: audience[EIDModel.SITE_ID].fetchStatus,
    isAdvancedOpen: audience.isAdvancedOpen,
    toggleIsAdvancedOpen: audience.toggleIsAdvancedOpen,
    trafficType: audience.trafficType,
    trafficSource: audience.trafficSource,
  };
})(observer(Audience));
