import React, { useState, ChangeEvent } from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Slider from '@material-ui/core/Slider';
import { TSpecialModel } from '../../stores/SpecialStore';
import ValueLabelComponent from './ValueLabelComponent';

import useStyles from './useStyles';

interface IWeightProps {
  special?: TSpecialModel;
}

const MIN_VALUE = 0;
const MAX_VALUE = 10;
const STEP = 1;

const Weight = ({ special }: IWeightProps): JSX.Element => {
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleSliderChange = (
    event: ChangeEvent<{}>,
    newValue: number | number[],
  ): void => {
    special.setWeight(newValue);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    special.setWeight(
      event.target.value === '' ? 0 : Number(event.target.value),
    );
  };

  const handleBlur = (): void => {
    if (special.weight < MIN_VALUE) {
      special.setWeight(MIN_VALUE);
    } else if (special.weight > MAX_VALUE) {
      special.setWeight(MAX_VALUE);
    }
    setIsFocused(false);
  };

  const handleFocus = (): void => {
    setIsFocused(true);
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={4}>
        <Slider
          value={special.weight}
          onChange={handleSliderChange}
          ValueLabelComponent={ValueLabelComponent}
          step={STEP}
          marks
          min={MIN_VALUE}
          max={MAX_VALUE}
        />
      </Grid>
      <Grid item xs={1}>
        <Input
          value={isFocused && !special.weight ? '' : special.weight}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={classes.inputWrapper}
          classes={{ input: classes.input }}
          inputProps={{
            step: STEP,
            min: MIN_VALUE,
            max: MAX_VALUE,
            type: 'number',
          }}
        />
      </Grid>
    </Grid>
  );
};

export default inject(({ newCampaignSettings }) => ({
  special: newCampaignSettings.special,
}))(observer(Weight));
