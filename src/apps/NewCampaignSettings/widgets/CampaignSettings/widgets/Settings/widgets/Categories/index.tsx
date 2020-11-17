import React from 'react';
import { inject, observer } from 'mobx-react';

import { AllCustomStatus } from 'sharedTypes';
import AllCustomRadio from '../../../../components/AllCustomRadio';
import CategoriesList from '../CategoriesList';
import CustomChip from '../../../../components/CustomChip';
import { TCategoriesModel } from '../../stores/models/Categories';

interface ICategoriesProps {
  categories?: TCategoriesModel;
}

const Categories = ({
  categories,
}: ICategoriesProps): JSX.Element => {
  return (
    <>
      <AllCustomRadio
        onChange={categories.setCategoriesRadio}
        value={categories.categoriesRadio}
        name="categories"
      />

      {categories.categoriesRadio === AllCustomStatus.CUSTOM && (
        <>
          <CustomChip
            label={categories.selectedTags.length}
            isActive
            isSmall
          />
          <CustomChip
            label={
              categories.blackListTags.length +
              categories.tempBlackListTags.length
            }
            isError
            isSmall
          />
        </>
      )}

      {categories.categoriesRadio === AllCustomStatus.CUSTOM && (
        <CategoriesList />
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  categories: newCampaignSettings.settings.categories,
}))(observer(Categories));
