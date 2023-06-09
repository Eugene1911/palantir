import React, { useEffect, useState } from 'react';

import { inject, observer } from 'mobx-react';
import AccordionPanel from 'sharedComponents/Accordion';
import { LoadingStatus } from 'sharedTypes';
import HowToReg from '@material-ui/icons/HowToReg';
import { tabs } from './constants/tabs';
import { ISubInfoType } from '../../../../types/subInfoType';

interface ISpecialProps {
  isAdvertiserAccountManager?: boolean;
  getAccordionText?: () => ISubInfoType;
  campaignStatus?: LoadingStatus;
}

const Special = ({
  isAdvertiserAccountManager,
  getAccordionText,
  campaignStatus,
}: ISpecialProps): JSX.Element => {
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
  }, [campaignStatus]);

  return (
    <AccordionPanel
      Icon={HowToReg}
      title="Special"
      isSelected={false}
      tabs={tabs(isAdvertiserAccountManager)}
      subInfo1={subInfo.subInfo1}
      onExpand={getNewSubInfo}
    />
  );
};

export default inject(({ newCampaignSettings }) => ({
  isAdvertiserAccountManager:
    newCampaignSettings.permissions.isAdvertiserAccountManager,
  getAccordionText: newCampaignSettings.special.getAccordionText,
  campaignStatus: newCampaignSettings.edit.campaignStatus,
}))(observer(Special));
