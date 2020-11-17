import React from 'react';
import { inject, observer } from 'mobx-react';

import GpsFixed from '@material-ui/icons/GpsFixed';
import AccordionPanel from 'sharedComponents/Accordion';
import { tabs } from './constants/tabs';

interface ITargetingProps {
  isAdvancedOpen?: boolean;
  toggleIsAdvancedOpen?: () => void;
}

const Targeting = ({
  isAdvancedOpen,
  toggleIsAdvancedOpen,
}: ITargetingProps): JSX.Element => {
  return (
    <AccordionPanel
      Icon={GpsFixed}
      title="Targeting"
      isSelected={false}
      tabs={tabs(isAdvancedOpen, toggleIsAdvancedOpen)}
    />
  );
};

export default inject(({ newCampaignSettings }) => ({
  isAdvancedOpen: newCampaignSettings.targeting.isAdvancedOpen,
  toggleIsAdvancedOpen:
    newCampaignSettings.targeting.toggleIsAdvancedOpen,
}))(observer(Targeting));
