import React from 'react';
import Accordion from 'sharedComponents/Accordion';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import { inject, observer } from 'mobx-react';
import {
  EAdModel,
  adModels,
  accordionTitle,
} from './assets/constants/commonPricingTypes';
import createTabs from './services/createTabs';

interface IPricingProps {
  adModel?: EAdModel;
  showRtb?: boolean;
}

function Pricing(props: IPricingProps): JSX.Element {
  const { adModel, showRtb } = props;
  const tabs = createTabs({ showRtb });

  return (
    <>
      <Accordion
        title={accordionTitle}
        Icon={SupervisedUserCircle}
        isSelected={false}
        subInfo1={adModels[adModel]}
        subInfo2=""
        subInfo3=""
        tabs={tabs}
      />
    </>
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => {
  const { pricing, audience } = CampaignAudienceAndPricingStore;
  return {
    adModel: pricing.adModel,
    showRtb: audience.rtb,
  };
})(observer(Pricing));
