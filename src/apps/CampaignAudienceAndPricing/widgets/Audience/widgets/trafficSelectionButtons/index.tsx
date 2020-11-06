import React from 'react';
import { inject, observer } from 'mobx-react';
import RadioButtons, {
  IRadioButton,
} from 'sharedComponents/RadioButtons';
import { ETrafficType } from '../../assets/constants/commonAudienceTypes';
import { radioTitles } from '../../assets/constants/rightSidesConst';

interface ITrafficSelectionButtonsProps {
  selected?: number;
  onChange?: (index: number) => void;
}

function TrafficSelectionButtons({
  selected,
  onChange,
}: ITrafficSelectionButtonsProps): JSX.Element {
  const buttons: IRadioButton[] = [
    radioTitles[ETrafficType.RON],
    radioTitles[ETrafficType.PRIME],
    radioTitles[ETrafficType.MEMBERS_AREA],
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
  selected: CampaignAudienceAndPricingStore.audience.trafficType,
  onChange: CampaignAudienceAndPricingStore.audience.setTrafficType,
}))(observer(TrafficSelectionButtons));
