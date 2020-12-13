import React from 'react';
import { inject, observer } from 'mobx-react';

import { AllCustomStatus } from 'sharedTypes';
import { getCarriers, getCountries } from 'resources/api';
import { TCarriersModel } from '../../stores/models/Carriers';
import AllCustomRadio from '../../../../components/AllCustomRadio';
import ChipsWithFilter from '../../../../components/ChipsWithFilter';
import { IFilterCategoryItem } from '../../../../components/CustomDrawer/components/ListCategory';
import { TCountriesModel } from '../../stores/models/Countries';
import { categoriesForceAdd } from '../../constants/categoriesForceAdd';

interface ICarriersProps {
  carriers?: TCarriersModel;
  countries?: TCountriesModel;
}

const Carriers = ({
  carriers,
  countries,
}: ICarriersProps): JSX.Element => {
  const filterCategoriesFunction = (
    category: IFilterCategoryItem,
  ): boolean => {
    let isSelectedCountry = false;
    if (countries.radio === AllCustomStatus.ALL) {
      isSelectedCountry = true;
    } else {
      const currentCountry = countries.categoriesList.find(
        country => country.id === category.id,
      );
      if (currentCountry) {
        isSelectedCountry = currentCountry.selected;
      }
    }
    return (
      (!!category.list.length ||
        categoriesForceAdd.includes(category.name)) &&
      isSelectedCountry
    );
  };

  return (
    <>
      <AllCustomRadio
        onChange={carriers.setRadio}
        value={carriers.radio}
        name="carriers"
      />

      {carriers.radio === AllCustomStatus.CUSTOM && (
        <ChipsWithFilter
          list={carriers.list}
          categoriesList={carriers.categoriesList}
          onSelect={carriers.setSelected}
          filterTitle="Choose carriers"
          loadingStatus={carriers.listStatus}
          getList={(notification): Promise<void> =>
            carriers.getList(notification, getCountries, getCarriers)
          }
          selectedCount={carriers.selectedCount}
          onSave={carriers.saveSelected}
          onCancel={carriers.cancelSelected}
          onDelete={carriers.deleteSelected}
          selectAllCategory={carriers.selectAllCategory}
          selectAllTags={carriers.selectAllItems}
          filterCategoriesFunction={filterCategoriesFunction}
        />
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  carriers: newCampaignSettings.targeting.carriers,
  countries: newCampaignSettings.targeting.countries,
}))(observer(Carriers));
