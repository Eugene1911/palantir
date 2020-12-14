import React, { useEffect, useState } from 'react';

import { inject, observer } from 'mobx-react';
import Event from '@material-ui/icons/Event';
import AccordionPanel from 'sharedComponents/Accordion';
import { LoadingStatus } from 'sharedTypes';
import { tabs } from './constants/tabs';
import { ISubInfoType } from '../../../../types/subInfoType';

interface ISchedulingProps {
  getAccordionText?: () => ISubInfoType;
  campaignStatus?: LoadingStatus;
}

const Scheduling = ({
  getAccordionText,
  campaignStatus,
}: ISchedulingProps): JSX.Element => {
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
      Icon={Event}
      title="Scheduling"
      isSelected={false}
      tabs={tabs}
      subInfo1={subInfo.subInfo1}
      subInfo2={subInfo.subInfo2}
      subInfo3={subInfo.subInfo3}
      onExpand={getNewSubInfo}
    />
  );
};

export default inject(({ newCampaignSettings }) => ({
  getAccordionText: newCampaignSettings.scheduling.getAccordionText,
  campaignStatus: newCampaignSettings.edit.campaignStatus,
}))(observer(Scheduling));
