import React from 'react';
import { inject, observer } from 'mobx-react';

import { AllCustomStatus } from 'sharedTypes';
import { TDeviceBrandsModel } from '../../stores/models/DeviceBrands';
import AllCustomRadio from '../../../../components/AllCustomRadio';
import ChipsWithFilter from '../../../../components/ChipsWithFilter';

interface IDeviceBrandsProps {
  deviceBrands?: TDeviceBrandsModel;
}

const DeviceBrands = ({
  deviceBrands,
}: IDeviceBrandsProps): JSX.Element => {
  return (
    <>
      <AllCustomRadio
        onChange={deviceBrands.setRadio}
        value={deviceBrands.radio}
        name="deviceBrands"
      />

      {deviceBrands.radio === AllCustomStatus.CUSTOM && (
        <ChipsWithFilter
          list={deviceBrands.list}
          categoriesList={deviceBrands.categoriesList}
          onSelect={deviceBrands.setSelected}
          filterTitle="Choose device brands"
          loadingStatus={deviceBrands.listStatus}
          getList={deviceBrands.getList}
          selectedCount={deviceBrands.selectedCount}
          onSave={deviceBrands.saveSelected}
          onCancel={deviceBrands.cancelSelected}
          onDelete={deviceBrands.deleteSelected}
          selectAllCategory={deviceBrands.selectAllCategory}
        />
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  deviceBrands: newCampaignSettings.targeting.deviceBrands,
}))(observer(DeviceBrands));
