import React from 'react';

import Chip from '@material-ui/core/Chip';

import useStyles from './useStyles';

export enum ChipType {
  DEFAULT = 'default',
  ACTIVE = 'active',
  ERROR = 'error',
}

interface ICustomChipProps {
  onClick?: () => void;
  isActive?: boolean;
  isError?: boolean;
  isSmall?: boolean;
  label: string | number;
}

const CustomChip = ({
  onClick,
  isActive,
  isError,
  label,
  isSmall,
}: ICustomChipProps): JSX.Element => {
  const classes = useStyles();
  // eslint-disable-next-line no-nested-ternary
  const type: ChipType = isError
    ? ChipType.ERROR
    : isActive
    ? ChipType.ACTIVE
    : ChipType.DEFAULT;

  return (
    <Chip
      label={label}
      className={classes[type]}
      onClick={onClick}
      variant="outlined"
      size={isSmall ? 'small' : undefined}
    />
  );
};

export default CustomChip;
