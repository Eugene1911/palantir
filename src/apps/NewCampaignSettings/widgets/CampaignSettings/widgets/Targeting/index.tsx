import React from 'react';
import { inject, observer } from 'mobx-react';

import GpsFixed from '@material-ui/icons/GpsFixed';
import AccordionPanel from 'sharedComponents/Accordion';
import { tabs } from './constants/tabs';

interface ITargetingProps {
  isAdvancedOpen?: boolean;
}

const Targeting = ({
  isAdvancedOpen,
}: ITargetingProps): JSX.Element => {
  return (
    <AccordionPanel
      Icon={GpsFixed}
      title="Targeting"
      isSelected={false}
      tabs={tabs(isAdvancedOpen)}
    />
  );
};

export default inject(({ newCampaignSettings }) => ({
  isAdvancedOpen: newCampaignSettings.targeting.isAdvancedOpen,
}))(observer(Targeting));
