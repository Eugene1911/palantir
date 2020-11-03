import React from 'react';

import AccordionPanel from 'sharedComponents/Accordion';
import HowToReg from '@material-ui/icons/HowToReg';
import { tabs } from './constants/tabs';

const Special = (): JSX.Element => {
  return (
    <AccordionPanel
      Icon={HowToReg}
      title="Special"
      isSelected={false}
      tabs={tabs}
    />
  );
};

export default Special;
