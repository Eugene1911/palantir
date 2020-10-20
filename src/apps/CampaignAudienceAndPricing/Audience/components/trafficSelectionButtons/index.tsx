import React from 'react';
import RadioButtons, {
  IRadioButton,
} from 'sharedComponents/RadioButtons';

import { AnyFunction } from 'sharedTypes';
import {
  ETrafficType,
  trafficTypes,
} from '../../assets/constants/trafficTypes';

interface ITrafficSelectionButtonsProps {
  selected: number;
  onChange: AnyFunction;
}

function TrafficSelectionButtons(
  props: ITrafficSelectionButtonsProps,
): JSX.Element {
  const buttons: IRadioButton[] = [
    trafficTypes[ETrafficType.RON],
    trafficTypes[ETrafficType.PRIME],
    trafficTypes[ETrafficType.MEMBERS_AREA],
  ];
  const { selected, onChange } = props;

  return (
    <RadioButtons
      buttons={buttons}
      selected={selected || 0}
      onChange={onChange}
    />
  );
}

export default TrafficSelectionButtons;
