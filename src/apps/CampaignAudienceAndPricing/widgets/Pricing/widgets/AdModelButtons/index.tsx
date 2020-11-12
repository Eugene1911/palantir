import React from 'react';
import { inject, observer } from 'mobx-react';
import RadioButtons, {
  IRadioButton,
} from 'sharedComponents/RadioButtons';
import { radioTitles } from '../../assets/constants/rightSidesConst';
import { EAdModel } from '../../assets/constants/commonPricingTypes';

interface IAdModelButtonsProps {
  selected?: number;
  onChange?: (index: number) => void;
}

function AdModelButtons({
  selected,
  onChange,
}: IAdModelButtonsProps): JSX.Element {
  const buttons: IRadioButton[] = [
    radioTitles[EAdModel.CPM],
    radioTitles[EAdModel.CPC],
    radioTitles[EAdModel.CPA],
  ];

  return (
    <RadioButtons
      buttons={buttons}
      selected={selected || 0}
      onChange={onChange}
    />
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  selected: CampaignAudienceAndPricingStore.pricing.adModel,
  onChange: CampaignAudienceAndPricingStore.pricing.setAdModel,
}))(observer(AdModelButtons));
