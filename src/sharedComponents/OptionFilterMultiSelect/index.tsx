import React from 'react';
import { RenderOptionState } from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import { TOptionFilterMultiSelect } from 'sharedTypes';

function OptionFilterMultiSelect<T extends TOptionFilterMultiSelect>(
  { id, name }: T,
  { selected }: RenderOptionState,
): JSX.Element {
  return (
    <>
      <Checkbox value={id} checked={selected} />
      {name}
    </>
  );
}
export default OptionFilterMultiSelect;
