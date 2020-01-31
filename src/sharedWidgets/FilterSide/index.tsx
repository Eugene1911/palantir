import React from 'react';
import { inject, observer } from 'mobx-react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';
import useFilterSide, {
  TUseFilterSide,
} from './services/useFilterSide';
import { TFilterSideStore } from './store/FilterSideStore';

type TFilterSideProps = {
  children: JSX.Element;
  filterSideStore: TFilterSideStore;
};

function FilterSide({
  children,
  filterSideStore,
}: TFilterSideProps): JSX.Element {
  const { t } = useTranslation();
  const { classes, drawerVariant }: TUseFilterSide = useFilterSide(
    filterSideStore,
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
        <CardContent>
          <IconButton
            onClick={(): void =>
              filterSideStore.onToggleFilterHandler()
            }
            className={classes.closeButton}
            aria-label="close button"
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          <Typography variant="h5" component="h3" gutterBottom>
            {t('common:title.Filter')}
          </Typography>
          {children}
        </CardContent>
      </Drawer>
    </div>
  );
}

export default inject(({ filterSideStore }) => ({
  filterSideStore,
}))(observer(FilterSide));
