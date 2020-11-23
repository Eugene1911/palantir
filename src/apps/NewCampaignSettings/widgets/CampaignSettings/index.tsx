import React, { useEffect, useState } from 'react';

import AccessControl from 'helpers/accessControl/controller';
import CampaignStepper from 'sharedComponents/CampaignStepper';
import Settings from './widgets/Settings';
import Scheduling from './widgets/Scheduling';
import Targeting from './widgets/Targeting';
import Special from './widgets/Special';
import SaveStepAction from './widgets/SaveStepActions';

const CampaignSettings = (): JSX.Element => {
  const [isSpecialTabVisible, setIsSpecialTabVisible] = useState<
    boolean
  >(false);

  useEffect(() => {
    AccessControl.canUseSpecialSettings().then(response =>
      setIsSpecialTabVisible(response),
    );
  }, []);

  return (
    <>
      CampaignSettings
      <CampaignStepper activeStep={0} />
      <Settings />
      <Scheduling />
      <Targeting />
      {isSpecialTabVisible && <Special />}
      <SaveStepAction />
    </>
  );
};

export default CampaignSettings;
