import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { ALL_ITEAM_MULTISELECT } from 'config/constants';

const renderOptionFormatMultiSelect = (
  { id, name },
  { selected },
) => (
  <>
    <Checkbox
      indeterminate={id === ALL_ITEAM_MULTISELECT.id}
      value={id}
      checked={selected}
    />
    {name}
  </>
);

export default renderOptionFormatMultiSelect;
