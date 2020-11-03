import React from 'react';

import CampaignStepper from 'sharedComponents/CampaignStepper';
import Settings from './widgets/Settings';
import Scheduling from './widgets/Scheduling';
import Targeting from './widgets/Targeting';
import Special from './widgets/Special';

const CampaignSettings = (): JSX.Element => {
  return (
    <>
      CampaignSettings
      <CampaignStepper activeStep={0} subLabels={['New Campaign']} />
      <Settings />
      <Scheduling />
      <Targeting />
      <Special />
    </>
  );
};

export default CampaignSettings;
