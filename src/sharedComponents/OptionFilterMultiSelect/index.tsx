import React from 'react';
import { AutocompleteRenderOptionState } from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import { TOptionFilterMultiSelect } from 'sharedTypes';

function OptionFilterMultiSelect<T extends TOptionFilterMultiSelect>(
  { id, name }: T,
  { selected }: AutocompleteRenderOptionState,
): JSX.Element {
  return (
    <>
      <Checkbox value={id} checked={selected} />
      {name}
    </>
  );
}
export default OptionFilterMultiSelect;
