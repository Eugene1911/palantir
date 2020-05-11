import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { TCommonFetchingDataType } from 'sharedTypes';

type TButtonGroupSelectProps<T> = {
  data?: Array<T>;
  onChange: (value: number) => void;
  value: number;
};

function ButtonGroupSelect<T extends TCommonFetchingDataType>({
  data,
  onChange,
  value,
}: TButtonGroupSelectProps<T>): JSX.Element {
  return (
    <ButtonGroup size="medium" variant="contained">
      {data.map(({ name, id }) => (
        <Button
          color={id === value ? 'primary' : 'default'}
          key={id}
          onClick={(): void => onChange(id)}
        >
          {name}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default ButtonGroupSelect;
