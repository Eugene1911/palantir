import React, { useEffect, useState } from 'react';

import { inject, observer } from 'mobx-react';
import Event from '@material-ui/icons/Event';
import AccordionPanel from 'sharedComponents/Accordion';
import { LoadingStatus } from 'sharedTypes';
import { tabs } from './constants/tabs';

interface ISchedulingProps {
  getAccordionText?: () => string[];
  campaignStatus?: LoadingStatus;
}

const Scheduling = ({
  getAccordionText,
  campaignStatus,
}: ISchedulingProps): JSX.Element => {
  const [subInfo, setSubInfo] = useState<string[]>(
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
      subInfo1={subInfo[0]}
      subInfo2={subInfo[1]}
      subInfo3={subInfo[2]}
      onExpand={getNewSubInfo}
    />
  );
};

export default inject(({ newCampaignSettings }) => ({
  getAccordionText: newCampaignSettings.scheduling.getAccordionText,
  campaignStatus: newCampaignSettings.edit.campaignStatus,
}))(observer(Scheduling));
