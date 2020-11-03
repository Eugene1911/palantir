import React, { ChangeEvent } from 'react';

import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { AllCustomStatus } from 'sharedTypes';

import useStyles from './useStyles';

interface IAllCustomRadioProps {
  onChange: (status: AllCustomStatus) => void;
  value: AllCustomStatus;
  name: string;
}

const AllCustomRadio = ({
  onChange,
  value,
  name,
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
            <FormControlLabel
              value={AllCustomStatus.ALL}
              control={<Radio color="primary" />}
              label="ALL"
              className={classes.radio}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              value={AllCustomStatus.CUSTOM}
              control={<Radio color="primary" />}
              label="CUSTOM"
            />
          </Grid>
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

export default AllCustomRadio;
