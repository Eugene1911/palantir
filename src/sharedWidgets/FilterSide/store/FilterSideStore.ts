import { types, Instance } from 'mobx-state-tree';

const FilterSideStore = types
  .model({
    isFilterSideOpen: types.optional(types.boolean, false),
  })
  .actions(self => ({
    onToggleFilterHandler(): void {
      self.isFilterSideOpen = !self.isFilterSideOpen;
    },
    onSetStateHandler(state: boolean): void {
      self.isFilterSideOpen = state;
    },
  }));

export type IFilterSideStore = Instance<typeof FilterSideStore>;
export default FilterSideStore;
