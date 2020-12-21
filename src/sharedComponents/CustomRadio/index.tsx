import React from 'react';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import useStyles from './useStyles';

const CustomRadio = (props: RadioProps): JSX.Element => {
  const classes = useStyles({});

  return (
    <Radio
      className={classes.root}
      color="primary"
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    />
  );
};

export default CustomRadio;
