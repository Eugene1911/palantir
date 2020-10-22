import React from 'react';
import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';

import CampaignStepper from 'sharedComponents/CampaignStepper';
import { TNewCampaignSettingsStore } from '../../stores/NewCampaignSettingsStore';
import Settings from './widgets/Settings';
import Scheduling from './widgets/Scheduling';
import Targeting from './widgets/Targeting';
import Special from './widgets/Special';

interface ICampaignSettingsProps {
  newCampaignSettings?: TNewCampaignSettingsStore;
}

const CampaignSettings = ({
  newCampaignSettings,
}: ICampaignSettingsProps): JSX.Element => {
  console.log('CampaignSettings', getSnapshot(newCampaignSettings));

  return (
    <div>
      CampaignSettings
      <CampaignStepper
        activeStep={0}
        subLabels={['New Campaign', null, null]}
      />
      <Settings />
      <Scheduling />
      <Targeting />
      <Special />
    </div>
  );
};

export default inject(({ newCampaignSettings }) => ({
  newCampaignSettings,
}))(observer(CampaignSettings));
