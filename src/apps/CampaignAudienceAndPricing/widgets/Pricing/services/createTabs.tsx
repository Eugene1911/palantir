import React from 'react';
import CampaignFormLabel from 'sharedComponents/CampaignFormLabel';
import { ITab } from 'sharedComponents/Accordion';
import { leftSidesConst } from '../assets/constants/leftSidesConst';
import AdModelButtons from '../widgets/AdModelButtons';
import DistributionSelector from '../widgets/DistributionSelector';
import RTBSelector from '../widgets/RTBPriceSelector';
import BudgetSelector from '../widgets/BudgetSelector';
import PriceSelector from '../widgets/Price';
import CustomSpotPrices from '../widgets/CustomSpotPrices';

export interface IPricingPermissions {
  isCPAAvailable: boolean;
  isRTBAvailable: boolean;
}

interface ICreateTabsProps {
  showRtb: boolean;
  permissions: IPricingPermissions;
}

function createTabs(
  props: ICreateTabsProps,
): Array<ITab | JSX.Element> {
  const { showRtb, permissions } = props;
  const { isCPAAvailable, isRTBAvailable } = permissions;

  const tabs: Array<ITab | JSX.Element> = [
    {
      leftSide: (
        <CampaignFormLabel
          text={leftSidesConst.adModel.title}
          tooltipText={leftSidesConst.adModel.tooltip}
        />
      ),
      rightSide: <AdModelButtons isCPAAvailable={isCPAAvailable} />,
    },
    {
      leftSide: (
        <CampaignFormLabel
          text={leftSidesConst.price.title}
          tooltipText={leftSidesConst.price.tooltip}
        />
      ),
      rightSide: <PriceSelector />,
    },
  ];

  showRtb &&
    isRTBAvailable &&
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
    {
      leftSide: (
        <CampaignFormLabel
          text={leftSidesConst.customSpot.title}
          tooltipText={leftSidesConst.customSpot.tooltip}
        />
      ),
      rightSide: <CustomSpotPrices />,
    },
  );

  return tabs;
}

export default createTabs;
