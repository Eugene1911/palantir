import React from 'react';

import AccordionPanel from 'sharedComponents/Accordion';
import SettingsIcon from '@material-ui/icons/Settings';
import { tabs } from './constants/tabs';

const Settings = (): JSX.Element => {
  return (
    <AccordionPanel
      Icon={SettingsIcon}
      title="Settings"
      tabs={tabs}
      isSelected
    />
  );
};

export default Settings;
