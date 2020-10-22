import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';

import { TSettingsModel } from './stores/SettingsStore';

interface ISettingsProps {
  settings?: TSettingsModel;
}

const Settings = ({ settings }: ISettingsProps): JSX.Element => {
  console.log('Settings', getSnapshot(settings));

  useEffect(() => {
    settings.setSettings('new SETTINGS');
  }, []);

  return <div>Settings</div>;
};

export default inject(({ newCampaignSettings }) => ({
  settings: newCampaignSettings.settings,
}))(observer(Settings));
