import React from 'react';
import { inject, observer } from 'mobx-react';

import { getOSes } from 'resources/api';
import { TOperatingSystemsModel } from '../../stores/models/OperatingSystems';
import AllCustomRadio from '../../../../components/AllCustomRadio';
import { AllCustomStatus } from '../../../../../../../../sharedTypes';
import ChipsWithFilter from '../../../../components/ChipsWithFilter';

interface IOperatingSystemsProps {
  operatingSystems?: TOperatingSystemsModel;
}

const OperatingSystems = ({
  operatingSystems,
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
          onSelect={operatingSystems.setSelected}
          filterTitle="Choose operating systems"
          loadingStatus={operatingSystems.listStatus}
          getList={(notification): Promise<void> =>
            operatingSystems.getList(notification, getOSes)
          }
          selectedCount={operatingSystems.selectedCount}
          onSave={operatingSystems.saveSelected}
          onCancel={operatingSystems.cancelSelected}
          onDelete={operatingSystems.deleteSelected}
        />
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  operatingSystems: newCampaignSettings.targeting.operatingSystems,
}))(observer(OperatingSystems));
