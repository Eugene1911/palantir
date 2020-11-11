import React from 'react';
import { inject, observer } from 'mobx-react';
import RadioButtons, {
  IRadioButton,
} from 'sharedComponents/RadioButtons';
import { ETrafficType } from '../../assets/constants/commonAudienceTypes';
import { radioTitles } from '../../assets/constants/rightSidesConst';
import { TSpot } from '../../stores/AudienceStore';

interface ITrafficSelectionButtonsProps {
  selected?: number;
  selectedSpots?: TSpot[];
  onChange?: (index: number) => void;
}

function TrafficSelectionButtons({
  selected,
  onChange,
  selectedSpots,
}: ITrafficSelectionButtonsProps): JSX.Element {
  const buttons: IRadioButton[] = [
    radioTitles[ETrafficType.RON],
    {
      ...radioTitles[ETrafficType.PRIME],
      label:
        selected === ETrafficType.PRIME
          ? String(selectedSpots.length)
          : undefined,
    },
    {
      ...radioTitles[ETrafficType.MEMBERS_AREA],
      label:
        selected === ETrafficType.MEMBERS_AREA
          ? String(selectedSpots.length)
          : undefined,
    },
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
  selectedSpots:
    CampaignAudienceAndPricingStore.audience.selectedSpots,
  onChange: CampaignAudienceAndPricingStore.audience.setTrafficType,
}))(observer(TrafficSelectionButtons));
