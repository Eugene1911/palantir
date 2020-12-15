import React from 'react';
import { ITab } from 'sharedComponents/Accordion';
import CampaignFormLabel from 'sharedComponents/CampaignFormLabel';
import AdFormat from '../widgets/AdFormat';
import Categories from '../widgets/Categories';
import NameAndGroup from '../widgets/NameAndGroup';

export const tabs: ITab[] = [
  {
    leftSide: (
      <CampaignFormLabel text="Name and group" withInputMargin />
    ),
    rightSide: <NameAndGroup />,
  },
  {
    leftSide: <CampaignFormLabel text="Ad format" withInputMargin />,
    rightSide: <AdFormat />,
  },
  {
    leftSide: (
      <CampaignFormLabel
        text="Categories"
        tooltipText={
          'To target specific categories, please choose the Custom ' +
          'mode and click on the necessary ones. You can target only ' +
          'adult categories, only mainstream ones, or both. You can ' +
          'also blacklist the categories using the button "Add tags ' +
          'to blacklist". '
        }
        withRadioMargin
      />
    ),
    rightSide: <Categories />,
  },
];
