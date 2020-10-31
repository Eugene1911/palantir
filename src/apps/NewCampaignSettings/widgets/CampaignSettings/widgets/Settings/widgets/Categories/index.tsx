import React from 'react';
import { inject, observer } from 'mobx-react';

import { AllCustomStatus } from 'sharedTypes';
import { TSettingsModel } from '../../stores/SettingsStore';
import AllCustomRadio from '../../../../components/AllCustomRadio';
import CategoriesList from '../CategoriesList';
import CustomChip from '../../../../components/CustomChip';

interface ICategoriesProps {
  settings?: TSettingsModel;
}

const Categories = ({ settings }: ICategoriesProps): JSX.Element => {
  return (
    <>
      <AllCustomRadio
        onChange={settings.setCategoriesRadio}
        value={settings.categoriesRadio}
        name="categories"
      />

      {settings.categoriesRadio === AllCustomStatus.CUSTOM && (
        <>
          <CustomChip
            label={settings.selectedTags.length}
            isActive
            isSmall
          />
          <CustomChip
            label={
              settings.blackListTags.length +
              settings.tempBlackListTags.length
            }
            isError
            isSmall
          />
        </>
      )}

      {settings.categoriesRadio === AllCustomStatus.CUSTOM && (
        <CategoriesList />
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  settings: newCampaignSettings.settings,
}))(observer(Categories));
