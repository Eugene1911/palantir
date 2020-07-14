import React from 'react';
import WrapperStartAppComponent from 'sharedComponents/WrapperStartAppComponent';
import CampaignEditCommonSettings from './widgets/CampaignEditCommonSettings';

function CampaignEdit(): JSX.Element {
  const store = {};

  return (
    <WrapperStartAppComponent store={store}>
      <CampaignEditCommonSettings />
    </WrapperStartAppComponent>
  );
}

export default CampaignEdit;
