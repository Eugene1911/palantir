import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormControlLabelProps } from '@material-ui/core';
import useStyles from './useStyles';
import CustomRadio from '../CustomRadio';

const CustomFormControlLabel = (
  props: { groupValue: string; control?: JSX.Element } & Omit<
    FormControlLabelProps,
    'control'
  >,
): JSX.Element => {
  const classes = useStyles({});
  const { groupValue, ...newProps } = props;
  const { value, control } = newProps;

  return (
    <FormControlLabel
      {...newProps} // eslint-disable-line react/jsx-props-no-spreading
      control={control || <CustomRadio />}
      classes={{
        label:
          value === groupValue ? classes.activeLabel : classes.label,
      }}
    />
  );
};

export default CustomFormControlLabel;
