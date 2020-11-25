import React from 'react';
import Accordion from 'sharedComponents/Accordion';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { inject, observer } from 'mobx-react';
import {
  EAdModel,
  adModels,
  accordionTitle,
  EPriceType,
  EDistribution,
} from './assets/constants/commonPricingTypes';
import { EFetchStatus } from '../../assets/commonTypes';
import CustomSpotsTable from './widgets/CustomSpotsTable';
import createTabs from './services/createTabs';
import { textFieldLabels } from './assets/constants/rightSidesConst';

interface IPricingProps {
  adModel?: EAdModel;
  showRtb?: boolean;
  priceBid?: string;
  priceType?: EPriceType;
  priceFetchStatus?: EFetchStatus;
  getBidsPrice?: () => void;
  distribution?: EDistribution;
  dailyBudget?: string;
}

function Pricing(props: IPricingProps): JSX.Element {
  const {
    adModel,
    showRtb,
    getBidsPrice,
    priceFetchStatus,
    dailyBudget,
    distribution,
    priceBid,
    priceType,
  } = props;
  const tabs = createTabs({ showRtb });

  priceFetchStatus === EFetchStatus.NOT_FETCHED && getBidsPrice();

  const getInfo1 = React.useCallback(() => {
    let info1 = adModels[adModel];

    if (priceBid.length > 0) {
      info1 += `: $${priceBid} (${priceType})`;
    }

    return info1;
  }, [adModel, priceBid, priceType]);

  return (
    <>
      <Accordion
        title={accordionTitle}
        Icon={LocalAtmIcon}
        isSelected={false}
        subInfo1={getInfo1()}
        subInfo2={`${textFieldLabels.dailyBudget}: $${dailyBudget}, ${distribution}`}
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
    distribution: pricing.distribution,
    getBidsPrice: pricing.getBidsPrice,
    priceFetchStatus: pricing.price.fetchStatus,
    priceBid: pricing.price.bid,
    priceType: pricing.price.priceType,
    dailyBudget: pricing.budget.daily,
    showRtb: audience.rtb,
  };
})(observer(Pricing));
