import React, { useEffect, useState } from 'react';

import { inject, observer } from 'mobx-react';
import AccordionPanel from 'sharedComponents/Accordion';
import { LoadingStatus } from 'sharedTypes';
import SettingsIcon from '@material-ui/icons/Settings';
import { tabs } from './constants/tabs';

interface ISettingsProps {
  getAccordionText?: () => string[];
  campaignStatus?: LoadingStatus;
}

const Settings = ({
  getAccordionText,
  campaignStatus,
}: ISettingsProps): JSX.Element => {
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
      Icon={SettingsIcon}
      title="Settings"
      tabs={tabs}
      isSelected
      subInfo1={subInfo[0]}
      subInfo2={subInfo[1]}
      subInfo3={subInfo[2]}
      onExpand={getNewSubInfo}
    />
  );
};

export default inject(({ newCampaignSettings }) => ({
  getAccordionText: newCampaignSettings.settings.getAccordionText,
  campaignStatus: newCampaignSettings.edit.campaignStatus,
}))(observer(Settings));
