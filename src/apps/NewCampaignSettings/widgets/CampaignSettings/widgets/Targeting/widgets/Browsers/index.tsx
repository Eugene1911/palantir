import React from 'react';
import { inject, observer } from 'mobx-react';

import { getBrowsers } from 'resources/api';
import { AllCustomStatus } from 'sharedTypes';
import { TBrowsersModel } from '../../stores/models/Browsers';
import AllCustomRadio from '../../../../components/AllCustomRadio';
import ChipsWithFilter from '../../../../components/ChipsWithFilter';

interface IBrowsersProps {
  browsers?: TBrowsersModel;
}

const Browsers = ({ browsers }: IBrowsersProps): JSX.Element => {
  return (
    <>
      <AllCustomRadio
        onChange={browsers.setRadio}
        value={browsers.radio}
        name="browsers"
      />

      {browsers.radio === AllCustomStatus.CUSTOM && (
        <ChipsWithFilter
          list={browsers.list}
          onSelect={browsers.setSelected}
          filterTitle="Choose browsers"
          loadingStatus={browsers.listStatus}
          getList={(notification): Promise<void> =>
            browsers.getList(notification, getBrowsers)
          }
          selectedCount={browsers.selectedCount}
          onSave={browsers.saveSelected}
          onCancel={browsers.cancelSelected}
          onDelete={browsers.deleteSelected}
        />
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  browsers: newCampaignSettings.targeting.browsers,
}))(observer(Browsers));
