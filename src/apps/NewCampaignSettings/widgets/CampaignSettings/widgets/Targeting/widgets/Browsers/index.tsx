import React from 'react';
import { inject, observer } from 'mobx-react';

import { getBrowsers, getBrowsersVersions } from 'resources/api';
import { AllCustomStatus, LoadingStatus } from 'sharedTypes';
import { TBrowsersModel } from '../../stores/models/Browsers';
import AllCustomRadio from '../../../../components/AllCustomRadio';
import ChipsWithFilter from '../../../../components/ChipsWithFilter';

interface IBrowsersProps {
  browsers?: TBrowsersModel;
  canUseBrowserVersions?: boolean;
  permissionsStatus?: LoadingStatus;
}

const Browsers = ({
  browsers,
  canUseBrowserVersions,
  permissionsStatus,
}: IBrowsersProps): JSX.Element => {
  return (
    <>
      <AllCustomRadio
        onChange={browsers.setRadio}
        value={browsers.radio}
        name="browsers"
        counter={browsers.selectedCount}
      />

      {browsers.radio === AllCustomStatus.CUSTOM && (
        <ChipsWithFilter
          list={browsers.list}
          categoriesList={browsers.categoriesList}
          onSelect={browsers.setSelected}
          filterTitle="Choose browsers"
          loadingStatus={browsers.listStatus}
          getList={(notification): Promise<void> =>
            browsers.getList(
              notification,
              getBrowsers,
              getBrowsersVersions,
              canUseBrowserVersions,
            )
          }
          selectedCount={browsers.selectedCount}
          onSave={browsers.saveSelected}
          onCancel={browsers.cancelSelected}
          onDelete={browsers.deleteSelected}
          selectAllCategory={browsers.selectAllCategory}
          permissionsStatus={permissionsStatus}
          selectAllTags={browsers.selectAllItems}
        />
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  browsers: newCampaignSettings.targeting.browsers,
  canUseBrowserVersions:
    newCampaignSettings.permissions.canUseBrowserVersions,
  permissionsStatus:
    newCampaignSettings.permissions.permissionsStatus,
}))(observer(Browsers));
