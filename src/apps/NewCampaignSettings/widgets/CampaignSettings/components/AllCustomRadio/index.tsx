import React, { ChangeEvent } from 'react';

import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import CustomFormControlLabel from 'sharedComponents/CustomFormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { AllCustomStatus } from 'sharedTypes';
import CustomChip from '../CustomChip';

import useStyles from './useStyles';

interface IAllCustomRadioProps {
  onChange: (status: AllCustomStatus) => void;
  value: AllCustomStatus;
  name: string;
  counter?: string | number;
  allLabel?: string;
}

const AllCustomRadio = ({
  onChange,
  value,
  name,
  counter,
  allLabel,
}: IAllCustomRadioProps): JSX.Element => {
  const classes = useStyles();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const status: AllCustomStatus = event.target
      .value as AllCustomStatus;
    onChange(status);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup name={name} value={value} onChange={handleChange}>
        <Grid container>
          <Grid item>
            <CustomFormControlLabel
              groupValue={value}
              value={AllCustomStatus.ALL}
              label={allLabel || 'ALL'}
              className={classes.radio}
            />
          </Grid>
          <Grid item>
            <CustomFormControlLabel
              groupValue={value}
              value={AllCustomStatus.CUSTOM}
              label="CUSTOM"
            />
          </Grid>
          {!!counter && (
            <CustomChip isSmall label={counter} isActive />
          )}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

export default AllCustomRadio;
