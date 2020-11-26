import React from 'react';
import { inject, observer } from 'mobx-react';

import { getOSes, getOSesVersions } from 'resources/api';
import { AllCustomStatus } from 'sharedTypes';
import { TOperatingSystemsModel } from '../../stores/models/OperatingSystems';
import AllCustomRadio from '../../../../components/AllCustomRadio';
import ChipsWithFilter from '../../../../components/ChipsWithFilter';

interface IOperatingSystemsProps {
  operatingSystems?: TOperatingSystemsModel;
  canUseOsVersions?: boolean;
}

const OperatingSystems = ({
  operatingSystems,
  canUseOsVersions,
}: IOperatingSystemsProps): JSX.Element => {
  return (
    <>
      <AllCustomRadio
        onChange={operatingSystems.setRadio}
        value={operatingSystems.radio}
        name="operatingSystems"
      />

      {operatingSystems.radio === AllCustomStatus.CUSTOM && (
        <ChipsWithFilter
          list={operatingSystems.list}
          categoriesList={operatingSystems.categoriesList}
          onSelect={operatingSystems.setSelected}
          filterTitle="Choose operating systems"
          loadingStatus={operatingSystems.listStatus}
          getList={(notification): Promise<void> =>
            operatingSystems.getList(
              notification,
              getOSes,
              getOSesVersions,
              canUseOsVersions,
            )
          }
          selectedCount={operatingSystems.selectedCount}
          onSave={operatingSystems.saveSelected}
          onCancel={operatingSystems.cancelSelected}
          onDelete={operatingSystems.deleteSelected}
          selectAllCategory={operatingSystems.selectAllCategory}
        />
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  operatingSystems: newCampaignSettings.targeting.operatingSystems,
  canUseOsVersions: newCampaignSettings.permissions.canUseOsVersions,
}))(observer(OperatingSystems));
