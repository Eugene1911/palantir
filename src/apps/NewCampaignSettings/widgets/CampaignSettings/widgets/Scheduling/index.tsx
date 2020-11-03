import React from 'react';

import Event from '@material-ui/icons/Event';
import AccordionPanel from 'sharedComponents/Accordion';

import { tabs } from './constants/tabs';

const Scheduling = (): JSX.Element => {
  return (
    <AccordionPanel
      Icon={Event}
      title="Scheduling"
      isSelected={false}
      tabs={tabs}
    />
  );
};

export default Scheduling;
