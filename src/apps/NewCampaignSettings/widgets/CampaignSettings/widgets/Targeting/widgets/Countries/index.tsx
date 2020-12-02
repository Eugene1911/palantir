import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';

import { AllCustomStatus, LoadingStatus } from 'sharedTypes';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import { TCountriesModel } from '../../stores/models/Countries';
import AllCustomRadio from '../../../../components/AllCustomRadio';
import ChipsWithFilter from '../../../../components/ChipsWithFilter';
import { countriesGroups } from '../../constants/countriesGroups';
import CustomDrawer from '../../../../components/CustomDrawer';
import { IFilterCategoryItem } from '../../../../components/CustomDrawer/components/ListCategory';

interface ICountriesProps {
  countries?: TCountriesModel;
  canUseRegionSetting?: boolean;
  permissionsStatus?: LoadingStatus;
}

const Countries = ({
  countries,
  canUseRegionSetting,
  permissionsStatus,
}: ICountriesProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();
  const [isOpenRegionFilter, setIsOpenRegionFilter] = useState<
    boolean
  >(false);
  const [
    activeCountry,
    setActiveCountry,
  ] = useState<IFilterCategoryItem | null>(null);

  const closeRegionFilter = (): void => {
    setIsOpenRegionFilter(false);
    setActiveCountry(null);
  };

  const cancelSelectedRegion = (): void => {
    countries.cancelSelectedRegion(activeCountry.id);
    closeRegionFilter();
  };

  const openRegionFilter = (country: IFilterCategoryItem): void => {
    if (!country.list.length) {
      countries.getRegion(infoNotification, country.code).then(() => {
        setIsOpenRegionFilter(true);
        setActiveCountry(country);
      });
    } else {
      setIsOpenRegionFilter(true);
      setActiveCountry(country);
    }
  };

  return (
    <>
      <AllCustomRadio
        onChange={countries.setRadio}
        value={countries.radio}
        name="countries"
        counter={countries.getAllCount}
      />

      {countries.radio === AllCustomStatus.CUSTOM && (
        <>
          <ChipsWithFilter
            list={countries.list}
            onSelect={countries.setSelected}
            filterTitle="Choose countries and region"
            loadingStatus={countries.listStatus}
            getList={countries.getList}
            selectedCount={countries.selectedCount}
            onSave={countries.saveSelected}
            onCancel={countries.cancelSelected}
            onDelete={countries.deleteSelected}
            categoriesList={countries.categoriesList}
            selectAllCategory={countries.selectAllCategory}
            topFilterTitle="SHOW REGION"
            topFilterPermission={canUseRegionSetting}
            filtersOptions={countriesGroups}
            openAsyncFilter={openRegionFilter}
            permissionsStatus={permissionsStatus}
            isAsyncLoadingList
          />

          {activeCountry && (
            <CustomDrawer
              isOpen={isOpenRegionFilter}
              selectedCount={activeCountry.selectedCount}
              onCancel={cancelSelectedRegion}
              onSave={closeRegionFilter}
              title={`${activeCountry.name} region`}
              list={activeCountry.list || []}
              onSelect={countries.setSelected}
              withCloseButton={false}
              withBackButton
            />
          )}
        </>
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  countries: newCampaignSettings.targeting.countries,
  canUseRegionSetting:
    newCampaignSettings.permissions.canUseRegionSetting,
  permissionsStatus:
    newCampaignSettings.permissions.permissionsStatus,
}))(observer(Countries));
