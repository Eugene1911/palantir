import React from 'react';
import cn from 'classnames';

import Chip from '@material-ui/core/Chip';

import useStyles from './useStyles';

export enum ChipType {
  DEFAULT = 'default',
  ACTIVE = 'active',
  ERROR = 'error',
}

interface ICustomChipProps {
  onClick?: () => void;
  onDelete?: () => void;
  isActive?: boolean;
  isError?: boolean;
  isSmall?: boolean;
  label: string | number;
  className?: string;
}

const CustomChip = ({
  onClick,
  isActive,
  isError,
  label,
  isSmall,
  onDelete,
  className,
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
      className={cn(classes[type], { [className]: !!className })}
      onClick={onClick}
      onDelete={onDelete}
      variant="outlined"
      size={isSmall ? 'small' : undefined}
      classes={{
        sizeSmall: classes.small,
        deleteIcon: classes.deleteIcon,
      }}
    />
  );
};

export default CustomChip;
