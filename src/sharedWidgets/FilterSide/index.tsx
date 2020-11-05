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
import { AnyFunction } from '../../sharedTypes';

type TFilterSideProps = {
  children: JSX.Element;
  filterSideStore?: TFilterSideStore;
  title: string;
  width: number;
  onClose?: AnyFunction;
};

function FilterSide({
  children,
  filterSideStore,
  title,
  width,
  onClose,
}: TFilterSideProps): JSX.Element {
  const { classes, drawerVariant }: TUseFilterSide = useFilterSide(
    filterSideStore,
    width,
  );

  const onCloseHandler = () => {
    onClose?.();
    filterSideStore.onToggleFilterHandler();
  };

  return (
    <div className={classes.drawer}>
      <Drawer
        variant={drawerVariant}
        open={filterSideStore.isFilterSideOpen}
        anchor="right"
        onClose={onCloseHandler}
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
