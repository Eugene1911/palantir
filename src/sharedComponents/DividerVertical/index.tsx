import React from 'react';
import Divider from '@material-ui/core/Divider';

type TDividerVertical = {
  style: Record<string, string>;
};

function DividerVertical({ style }: TDividerVertical): JSX.Element {
  return (
    <Divider
      orientation="vertical"
      style={{
        ...style,
        height: 'auto',
        alignSelf: 'stretch',
      }}
    />
  );
}

export default DividerVertical;
