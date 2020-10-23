import React from 'react';
import { ITab } from 'sharedComponents/Accordion';
import CampaignFormLabel from 'sharedComponents/CampaignFormLabel';
import StartEndDate from '../widgets/StartEndDate';
import DayTimeRange from '../widgets/DayTimeRange';

export const tabs: ITab[] = [
  {
    leftSide: <CampaignFormLabel text="Start and end date" />,
    rightSide: <StartEndDate />,
  },
  {
    leftSide: (
      <CampaignFormLabel
        text="Day-time range"
        tooltipText={
          'To set up your day-time range of showing the ads, please ' +
          'choose the Custom mode. You can select the pre-set ranges: ' +
          '"Working hours", "Day time" and "Night time". Or you can ' +
          'hover over the time and extend it by selecting the ' +
          'period you need.'
        }
      />
    ),
    rightSide: <DayTimeRange />,
  },
];
