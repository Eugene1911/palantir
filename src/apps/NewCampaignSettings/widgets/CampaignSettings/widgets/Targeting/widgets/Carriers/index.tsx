import React from 'react';
import { inject, observer } from 'mobx-react';

import { AllCustomStatus } from 'sharedTypes';
import { getCarriers } from 'resources/api';
import { TCarriersModel } from '../../stores/models/Carriers';
import AllCustomRadio from '../../../../components/AllCustomRadio';
import ChipsWithFilter from '../../../../components/ChipsWithFilter';

interface ICarriersProps {
  carriers?: TCarriersModel;
}

const Carriers = ({ carriers }: ICarriersProps): JSX.Element => {
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
          onSelect={carriers.setSelected}
          filterTitle="Choose carriers"
          loadingStatus={carriers.listStatus}
          getList={(notification): Promise<void> =>
            carriers.getList(notification, getCarriers)
          }
          selectedCount={carriers.selectedCount}
          onSave={carriers.saveSelected}
          onCancel={carriers.cancelSelected}
          onDelete={carriers.deleteSelected}
        />
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  carriers: newCampaignSettings.targeting.carriers,
}))(observer(Carriers));
