import React from 'react';
import { ITab } from 'sharedComponents/Accordion';
import CampaignFormLabel from 'sharedComponents/CampaignFormLabel';
import AdBlock from '../widgets/AdBlock';
import Flash from '../widgets/Flash';
import PrivateMode from '../widgets/PrivateMode';
import Feature from '../widgets/Feature';
import Weight from '../widgets/Weight';
import FlatDeal from '../widgets/FlatDeal';

const advertiserAccountManagerTabs: ITab[] = [
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
    leftSide: (
      <CampaignFormLabel
        text="Flat deal"
        tooltipText={
          'For managers only to set up the % of traffic fixed for the ' +
          'flat campaign. Please type the number, for example, 50, ' +
          'and save the campaign. For managers only to set up fixed ' +
          'amount of impressions for the flat campaign. Please type ' +
          'the number, for example, 10000, and save the campaign.'
        }
        withRadioMargin
      />
    ),
    rightSide: <FlatDeal />,
  },
  {
    leftSide: <CampaignFormLabel text="AdBlock" withRadioMargin />,
    rightSide: <AdBlock />,
  },
  {
    leftSide: (
      <CampaignFormLabel text="Private mode" withRadioMargin />
    ),
    rightSide: <PrivateMode />,
  },
  {
    leftSide: <CampaignFormLabel text="Flash" withRadioMargin />,
    rightSide: <Flash />,
  },
];

export const tabs = (
  isAdvertiserAccountManager: boolean,
): Array<ITab | JSX.Element> => [
  {
    leftSide: (
      <CampaignFormLabel
        text="Feature"
        tooltipText={
          'Exclusive. For managers only. The feature allows you to ' +
          'lock the ad campaign, so only managers can edit it (besides ' +
          'adding the new creatives), and is typically used for flat deals.'
        }
        withRadioMargin
      />
    ),
    rightSide: <Feature />,
  },
  ...(isAdvertiserAccountManager ? advertiserAccountManagerTabs : []),
];
