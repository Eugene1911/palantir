import React from 'react';
import { inject, observer } from 'mobx-react';
import RadioButtons, {
  IRadioButton,
} from 'sharedComponents/RadioButtons';
import {
  ETrafficType,
  trafficTypes,
} from '../../assets/constants/commonAudienceTypes';

interface ITrafficSelectionButtonsProps {
  selected?: number;
  onChange?: (index: number) => void;
}

function TrafficSelectionButtons({
  selected,
  onChange,
}: ITrafficSelectionButtonsProps): JSX.Element {
  const buttons: IRadioButton[] = [
    trafficTypes[ETrafficType.RON],
    trafficTypes[ETrafficType.PRIME],
    trafficTypes[ETrafficType.MEMBERS_AREA],
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
