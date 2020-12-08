import React from 'react';
import { inject, observer } from 'mobx-react';

import GpsFixed from '@material-ui/icons/GpsFixed';
import AccordionPanel from 'sharedComponents/Accordion';
import { tabs } from './constants/tabs';

interface ITargetingProps {
  isAdvancedOpen?: boolean;
  canUseDeviceSetting?: boolean;
  canUseTrafficSourceType?: boolean;
  canUseKeywords?: boolean;
  toggleIsAdvancedOpen?: () => void;
}

const Targeting = ({
  isAdvancedOpen,
  toggleIsAdvancedOpen,
  canUseDeviceSetting,
  canUseTrafficSourceType,
  canUseKeywords,
}: ITargetingProps): JSX.Element => {
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
}))(observer(Targeting));
