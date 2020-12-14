import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import GpsFixed from '@material-ui/icons/GpsFixed';
import { LoadingStatus } from 'sharedTypes';
import AccordionPanel from 'sharedComponents/Accordion';
import { tabs } from './constants/tabs';
import { ISubInfoType } from '../../../../types/subInfoType';

interface ITargetingProps {
  isAdvancedOpen?: boolean;
  canUseDeviceSetting?: boolean;
  canUseTrafficSourceType?: boolean;
  canUseKeywords?: boolean;
  toggleIsAdvancedOpen?: () => void;
  getAccordionText?: () => ISubInfoType;
  campaignStatus?: LoadingStatus;
  getAllCount?: () => string;
}

const Targeting = ({
  isAdvancedOpen,
  toggleIsAdvancedOpen,
  canUseDeviceSetting,
  canUseTrafficSourceType,
  canUseKeywords,
  getAccordionText,
  campaignStatus,
  getAllCount,
}: ITargetingProps): JSX.Element => {
  const [subInfo, setSubInfo] = useState<ISubInfoType>(
    getAccordionText(),
  );

  const getNewSubInfo = (isExpanded): void => {
    if (!isExpanded) {
      setSubInfo(getAccordionText());
    }
  };

  useEffect(() => {
    getNewSubInfo(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignStatus, getAllCount()]);

  return (
    <AccordionPanel
      Icon={GpsFixed}
      title="Targeting"
      isSelected={false}
      tabs={tabs(
        isAdvancedOpen,
        toggleIsAdvancedOpen,
        canUseDeviceSetting,
        canUseTrafficSourceType,
        canUseKeywords,
      )}
      subInfo1={subInfo.subInfo1}
      subInfo2={subInfo.subInfo2}
      onExpand={getNewSubInfo}
    />
  );
};

export default inject(({ newCampaignSettings }) => ({
  isAdvancedOpen: newCampaignSettings.targeting.isAdvancedOpen,
  toggleIsAdvancedOpen:
    newCampaignSettings.targeting.toggleIsAdvancedOpen,
  canUseDeviceSetting:
    newCampaignSettings.permissions.canUseDeviceSetting,
  canUseTrafficSourceType:
    newCampaignSettings.permissions.canUseTrafficSourceType,
  canUseKeywords: newCampaignSettings.permissions.canUseKeywords,
  getAccordionText: newCampaignSettings.targeting.getAccordionText,
  campaignStatus: newCampaignSettings.edit.campaignStatus,
  getAllCount: newCampaignSettings.targeting.countries.getAllCount,
}))(observer(Targeting));
