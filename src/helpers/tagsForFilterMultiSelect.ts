import { MAX_COUNT_SELECTED_ITEMS } from 'config/constants';
import { TOptionFilterMultiSelect } from 'sharedTypes';

function tagsForFilterMultiSelect<T extends TOptionFilterMultiSelect>(
  selectedValues: Array<T>,
): string {
  const countSelected = selectedValues.length;

  if (!countSelected) return 'All';

  if (countSelected >= MAX_COUNT_SELECTED_ITEMS) {
    return `Selected ${countSelected}`;
  }

  return selectedValues.map(({ name }) => name).join(',');
}

export default tagsForFilterMultiSelect;
