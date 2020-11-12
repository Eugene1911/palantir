import React from 'react';
import CampaignFormLabel from 'sharedComponents/CampaignFormLabel';
import { ITab } from 'sharedComponents/Accordion';
import { leftSidesConst } from '../assets/constants/leftSidesConst';
import AdModelButtons from '../widgets/AdModelButtons';
import DistributionSelector from '../widgets/DistributionSelector';
import RTBSelector from '../widgets/RTBPriceSelector';
import BudgetSelector from '../widgets/BudgetSelector';

interface ICreateTabsProps {
  showRtb: boolean;
}

function createTabs(
  props: ICreateTabsProps,
): Array<ITab | JSX.Element> {
  const { showRtb } = props;

  const tabs: Array<ITab | JSX.Element> = [
    {
      leftSide: (
        <CampaignFormLabel
          text={leftSidesConst.adModel.title}
          tooltipText={leftSidesConst.adModel.tooltip}
        />
      ),
      rightSide: <AdModelButtons />,
    },
  ];

  showRtb &&
    tabs.push({
      leftSide: <CampaignFormLabel text={leftSidesConst.rtb.title} />,
      rightSide: <RTBSelector />,
    });

  tabs.push(
    {
      leftSide: (
        <CampaignFormLabel text={leftSidesConst.budget.title} />
      ),
      rightSide: <BudgetSelector />,
    },
    {
      leftSide: (
        <CampaignFormLabel
          text={leftSidesConst.distribution.title}
          tooltipText={leftSidesConst.distribution.tooltip}
        />
      ),
      rightSide: <DistributionSelector />,
    },
  );

  return tabs;
}

export default createTabs;
