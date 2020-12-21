import React from 'react';
import Cancel from '@material-ui/icons/Cancel';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from './useStyles';

interface IInputDeleteIconProps {
  onClick: () => void;
  value: number | string | null | undefined;
  visible?: boolean;
}

const InputDeleteIcon = ({
  onClick,
  value,
  visible,
}: IInputDeleteIconProps): JSX.Element => {
  const classes = useStyles();
  if ((!value && value !== 0) || !visible) {
    return null;
  }

  return (
    <InputAdornment
      className={classes.deleteIconWrapper}
      position="start"
    >
      <Cancel
        fontSize="small"
        className={classes.deleteIcon}
        onClick={onClick}
      />
    </InputAdornment>
  );
};

export default InputDeleteIcon;
