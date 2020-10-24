import React from 'react';
import { ITab } from 'sharedComponents/Accordion';
import CampaignFormLabel from 'sharedComponents/CampaignFormLabel';
import AdBlock from '../widgets/AdBlock';
import Flash from '../widgets/Flash';
import PrivateMode from '../widgets/PrivateMode';
import Feature from '../widgets/Feature';
import Weight from '../widgets/Weight';
import FlatDeal from '../widgets/FlatDeal';

export const tabs: ITab[] = [
  {
    leftSide: <CampaignFormLabel text="Feature" />,
    rightSide: <Feature />,
  },
  {
    leftSide: (
      <CampaignFormLabel
        text="Weight"
        tooltipText={
          'For managers only. Please don"t use it without necessity. ' +
          'This function creates clones of the campaign on the rotator ' +
          'side to grab more traffic. We recommend consulting with your ' +
          'team lead before using the feature.'
        }
      />
    ),
    rightSide: <Weight />,
  },
  {
    leftSide: <CampaignFormLabel text="Flat deal" />,
    rightSide: <FlatDeal />,
  },
  {
    leftSide: <CampaignFormLabel text="AdBlock" />,
    rightSide: <AdBlock />,
  },
  {
    leftSide: <CampaignFormLabel text="Private mode" />,
    rightSide: <PrivateMode />,
  },
  {
    leftSide: <CampaignFormLabel text="Flash" />,
    rightSide: <Flash />,
  },
];
