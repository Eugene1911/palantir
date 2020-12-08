import React from 'react';

import { inject, observer } from 'mobx-react';
import AccordionPanel from 'sharedComponents/Accordion';
import HowToReg from '@material-ui/icons/HowToReg';
import { tabs } from './constants/tabs';

interface ISpecialProps {
  isAdvertiserAccountManager?: boolean;
}

const Special = ({
  isAdvertiserAccountManager,
}: ISpecialProps): JSX.Element => {
  return (
    <AccordionPanel
      Icon={HowToReg}
      title="Special"
      isSelected={false}
      tabs={tabs(isAdvertiserAccountManager)}
    />
  );
};

export default inject(({ newCampaignSettings }) => ({
  isAdvertiserAccountManager:
    newCampaignSettings.permissions.isAdvertiserAccountManager,
}))(observer(Special));
