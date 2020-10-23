import React from 'react';
import WrapperStartAppComponent from 'sharedComponents/WrapperStartAppComponent';
import CampaignSettings from './widgets/CampaignSettings';
import NewCampaignSettingsStore from './stores/NewCampaignSettingsStore';

const NewCampaignSettings = (): JSX.Element => {
  const store = {
    newCampaignSettings: NewCampaignSettingsStore.create(),
  };

  return (
    <WrapperStartAppComponent store={store}>
      <CampaignSettings />
    </WrapperStartAppComponent>
  );
};

export default NewCampaignSettings;
