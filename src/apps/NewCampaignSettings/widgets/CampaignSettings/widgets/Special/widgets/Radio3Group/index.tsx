import React, { ChangeEvent } from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import CustomFormControlLabel from 'sharedComponents/CustomFormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {
  TSpecialModel,
  RadioFields,
  RadioTypes,
} from '../../stores/SpecialStore';

import useStyles from './useStyles';

interface IRadio3GroupProps {
  special?: TSpecialModel;
  radios: Array<{ value: string; label: string }>;
  field: RadioFields;
}

const Radio3Group = ({
  special,
  radios,
  field,
}: IRadio3GroupProps): JSX.Element => {
  const classes = useStyles();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const value: RadioTypes = event.target.value as RadioTypes;
    special.setRadioValue(value, field);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        name="radio3group"
        value={special[field]}
        onChange={handleChange}
      >
        <Grid container>
          {radios.map(radio => (
            <Grid key={radio.label} item>
              <CustomFormControlLabel
                groupValue={special[field]}
                value={radio.value}
                label={radio.label}
                className={classes.radio}
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

export default inject(({ newCampaignSettings }) => ({
  special: newCampaignSettings.special,
}))(observer(Radio3Group));
