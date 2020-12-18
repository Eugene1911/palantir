import React, { useEffect, useState } from 'react';
import Accordion from 'sharedComponents/Accordion';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { inject, observer } from 'mobx-react';
import AccessControl from 'helpers/accessControl/controller';
import {
  EAdModel,
  adModels,
  accordionTitle,
  EPriceType,
  EDistribution,
} from './assets/constants/commonPricingTypes';
import {
  EFetchStatus,
  IPricingResultData,
} from '../../assets/commonTypes';
import CustomSpotsTable from './widgets/CustomSpotsTable';
import createTabs, {
  IPricingPermissions,
} from './services/createTabs';
import { textFieldLabels } from './assets/constants/rightSidesConst';

interface IPricingProps {
  adModel?: EAdModel;
  showRtb?: boolean;
  priceBid?: string;
  priceType?: EPriceType;
  priceFetchStatus?: EFetchStatus;
  currentFormat?: number;
  getBidsPrice?: () => void;
  distribution?: EDistribution;
  dailyBudget?: string;
  initialCampaignData?: IPricingResultData;
  setPricingData?: (data: IPricingResultData) => void;
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
    initialCampaignData,
    setPricingData,
    currentFormat,
  } = props;
  const [permissions, setPermissions] = useState<IPricingPermissions>(
    {
      isCPAAvailable: false,
      isRTBAvailable: false,
    },
  );

  const getPricingPermissions = async () => {
    const [isCPAAvailable, isRTBAvailable] = await Promise.all([
      AccessControl.canUseAdModelCPA(),
      AccessControl.canUseRtb(),
    ]);

    setPermissions({
      isCPAAvailable,
      isRTBAvailable,
    });
  };

  useEffect(() => {
    getPricingPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initialCampaignData && setPricingData(initialCampaignData);
  }, [initialCampaignData]);

  const tabs = createTabs({ showRtb, permissions });

  priceFetchStatus === EFetchStatus.NOT_FETCHED && getBidsPrice();

  useEffect(() => {
    getBidsPrice();
  }, [currentFormat]);

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
    setPricingData: pricing.setPricingData,
    showRtb: audience.rtb,
    currentFormat: audience.formats.currentFormat,
  };
})(observer(Pricing));
