import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';

import { ITargetingModel } from './stores/TargetingStore';

interface ITargetingProps {
  targeting?: ITargetingModel;
}

const Targeting = ({ targeting }: ITargetingProps): JSX.Element => {
  console.log('Targeting', getSnapshot(targeting));

  useEffect(() => {
    targeting.setTargeting('new TARGETING');
  }, []);

  return <div>Targeting</div>;
};

export default inject(({ newCampaignSettings }) => ({
  targeting: newCampaignSettings.targeting,
}))(observer(Targeting));
