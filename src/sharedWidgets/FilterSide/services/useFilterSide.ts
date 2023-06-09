import { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { DrawerProps } from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles, { TFilterSideStyleClasses } from '../styles';
import { TFilterSideStore } from '../store/FilterSideStore';

export type TUseFilterSide = {
  classes: Record<TFilterSideStyleClasses, string>;
  drawerVariant: DrawerProps['variant'];
};

function useFilterSide(
  filterSideStore: TFilterSideStore,
  width: number,
): TUseFilterSide {
  const { breakpoints } = useTheme();
  const isBreakpointsMd = useMediaQuery(
    `(min-width: ${breakpoints.values.md}px)`,
  );
  const { isFilterSideOpen, onSetStateHandler } = filterSideStore;
  const drawerVariant = isBreakpointsMd ? 'persistent' : 'temporary';
  const classes = useStyles({
    isDrawerOpen: filterSideStore.isFilterSideOpen,
    width,
  });

  useEffect(() => {
    if (isBreakpointsMd && isFilterSideOpen) onSetStateHandler(true);
  }, [isFilterSideOpen, onSetStateHandler, isBreakpointsMd]);

  return {
    classes,
    drawerVariant,
  };
}

export default useFilterSide;
