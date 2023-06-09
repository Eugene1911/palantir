import React from 'react';
import { inject, observer } from 'mobx-react';

import { getOSes, getOSesVersions } from 'resources/api';
import { AllCustomStatus, LoadingStatus } from 'sharedTypes';
import { TOperatingSystemsModel } from '../../stores/models/OperatingSystems';
import AllCustomRadio from '../../../../components/AllCustomRadio';
import ChipsWithFilter from '../../../../components/ChipsWithFilter';

interface IOperatingSystemsProps {
  operatingSystems?: TOperatingSystemsModel;
  canUseOsVersions?: boolean;
  permissionsStatus?: LoadingStatus;
}

const OperatingSystems = ({
  operatingSystems,
  canUseOsVersions,
  permissionsStatus,
}: IOperatingSystemsProps): JSX.Element => {
  return (
    <>
      <AllCustomRadio
        onChange={operatingSystems.setRadio}
        value={operatingSystems.radio}
        name="operatingSystems"
        counter={operatingSystems.selectedCount}
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
          permissionsStatus={permissionsStatus}
          selectAllTags={operatingSystems.selectAllItems}
        />
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  operatingSystems: newCampaignSettings.targeting.operatingSystems,
  canUseOsVersions: newCampaignSettings.permissions.canUseOsVersions,
  permissionsStatus:
    newCampaignSettings.permissions.permissionsStatus,
}))(observer(OperatingSystems));
