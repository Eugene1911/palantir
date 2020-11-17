import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import { AllCustomStatus, LoadingStatus } from 'sharedTypes';
import FilterLoader from 'sharedComponents/loaders/FilterLoader';
import CategorySection from './components/CategorySection';
import CategoriesFilter from './components/CategoriesFilter';
import useStyles from './useStyles';
import { AddMode } from '../../constants/addMode';
import AddToBlackListPanel from './components/AddToBlackListPanel';
import Search from './components/Search';
import { TCategoriesModel } from '../../stores/models/Categories';

interface ICategoriesListProps {
  categories?: TCategoriesModel;
}

const CategoriesList = ({
  categories,
}: ICategoriesListProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();
  const classes = useStyles();

  useEffect(() => {
    if (categories.categoriesListStatus === LoadingStatus.INITIAL) {
      categories.getCategoriesList(infoNotification);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {categories.categoriesListStatus === LoadingStatus.LOADING ? (
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
            {Array.from(
              categories.categoriesList.values(),
            ).map(value =>
              value.active ? (
                <CategorySection key={value.id} section={value} />
              ) : null,
            )}
          </Grid>

          {categories.addMode === AddMode.BLACKLIST &&
            categories.categoriesRadio === AllCustomStatus.CUSTOM && (
              <AddToBlackListPanel />
            )}
        </>
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  categories: newCampaignSettings.settings.categories,
}))(observer(CategoriesList));
