import React from 'react';
import Accordion from 'sharedComponents/Accordion';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import { inject, observer } from 'mobx-react';
import {
  EAdModel,
  adModels,
  accordionTitle,
} from './assets/constants/commonPricingTypes';
import { EFetchStatus } from '../../assets/commonTypes';
import CustomSpotsTable from './widgets/CustomSpotsTable';
import createTabs from './services/createTabs';

interface IPricingProps {
  adModel?: EAdModel;
  showRtb?: boolean;
  priceFetchStatus?: EFetchStatus;
  getBidsPrice?: () => void;
}

function Pricing(props: IPricingProps): JSX.Element {
  const { adModel, showRtb, getBidsPrice, priceFetchStatus } = props;
  const tabs = createTabs({ showRtb });

  priceFetchStatus === EFetchStatus.NOT_FETCHED && getBidsPrice();

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
      <CustomSpotsTable />
    </>
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => {
  const { pricing, audience } = CampaignAudienceAndPricingStore;
  return {
    adModel: pricing.adModel,
    getBidsPrice: pricing.getBidsPrice,
    priceFetchStatus: pricing.price.fetchStatus,
    showRtb: audience.rtb,
  };
})(observer(Pricing));
