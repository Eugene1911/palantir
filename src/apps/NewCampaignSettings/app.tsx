import React from 'react';
import WrapperStartAppComponent from 'sharedComponents/WrapperStartAppComponent';
import CampaignSettings from './widgets/CampaignSettings';

function NewCampaignSettings(): JSX.Element {
  const store = {};

  return (
    <WrapperStartAppComponent store={store}>
      <CampaignSettings />
    </WrapperStartAppComponent>
  );
}

export default NewCampaignSettings;
