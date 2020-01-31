import { MAX_COUNT_SELECTED_ITEMS } from 'config/constants';

const renderTagsFormatMultiSelect = selectedValues => {
  const countSelected = selectedValues.length;

  if (!countSelected) return 'All';

  if (countSelected >= MAX_COUNT_SELECTED_ITEMS) {
    return `Selected format ${countSelected}`;
  }

  return selectedValues.map(({ name }) => name).join(',');
};

export default renderTagsFormatMultiSelect;
