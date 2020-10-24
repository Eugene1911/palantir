import React, { ReactElement } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

interface IValueLabelComponentProps {
  children: ReactElement;
  open: boolean;
  value: number;
}

const ValueLabelComponent = ({
  children,
  open,
  value,
}: IValueLabelComponentProps): JSX.Element => {
  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={value}
      arrow
    >
      {children}
    </Tooltip>
  );
};

export default ValueLabelComponent;
