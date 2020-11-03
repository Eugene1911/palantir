import React from 'react';
import { observer } from 'mobx-react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import useFilterSide, {
  TUseFilterSide,
} from './services/useFilterSide';
import { TFilterSideStore } from './store/FilterSideStore';

type TFilterSideProps = {
  children: JSX.Element;
  filterSideStore?: TFilterSideStore;
  title: string;
  width: number;
};

function FilterSide({
  children,
  filterSideStore,
  title,
  width,
}: TFilterSideProps): JSX.Element {
  const { classes, drawerVariant }: TUseFilterSide = useFilterSide(
    filterSideStore,
    width,
  );

  return (
    <div className={classes.drawer}>
      <Drawer
        variant={drawerVariant}
        open={filterSideStore.isFilterSideOpen}
        anchor="right"
        onClose={filterSideStore.onToggleFilterHandler}
        ModalProps={{
          keepMounted: true,
        }}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.header}>
          <IconButton
            onClick={(): void =>
              filterSideStore.onToggleFilterHandler()
            }
            className={classes.closeButton}
            aria-label="close button"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography variant="h6" component="h3" gutterBottom>
            {title}
          </Typography>
        </div>
        {children}
      </Drawer>
    </div>
  );
}

export default observer(FilterSide);
