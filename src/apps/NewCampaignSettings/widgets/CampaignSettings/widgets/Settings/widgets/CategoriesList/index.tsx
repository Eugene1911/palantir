import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import { AllCustomStatus, LoadingStatus } from 'sharedTypes';
import FilterLoader from 'sharedComponents/loaders/FilterLoader';
import { TSettingsModel } from '../../stores/SettingsStore';
import CategorySection from './components/CategorySection';
import CategoriesFilter from './components/CategoriesFilter';
import useStyles from './useStyles';
import { AddMode } from '../../constants/addMode';
import AddToBlackListPanel from './components/AddToBlackListPanel';
import Search from './components/Search';

interface ICategoriesListProps {
  settings?: TSettingsModel;
}

const CategoriesList = ({
  settings,
}: ICategoriesListProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();
  const classes = useStyles();

  useEffect(() => {
    if (settings.categoriesListStatus === LoadingStatus.INITIAL) {
      settings.getCategoriesList(infoNotification);
    }
  }, []);

  return (
    <>
      {settings.categoriesListStatus === LoadingStatus.LOADING ? (
        <FilterLoader />
      ) : (
        <>
          <CategoriesFilter />

          <Search />

          <Grid
            className={classes.categoriesList}
            container
            direction="column"
          >
            {Array.from(settings.categoriesList.values()).map(value =>
              value.active ? (
                <CategorySection key={value.id} section={value} />
              ) : null,
            )}
          </Grid>

          {settings.addMode === AddMode.BLACKLIST &&
            settings.categoriesRadio === AllCustomStatus.CUSTOM && (
              <AddToBlackListPanel />
            )}
        </>
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  settings: newCampaignSettings.settings,
}))(observer(CategoriesList));
