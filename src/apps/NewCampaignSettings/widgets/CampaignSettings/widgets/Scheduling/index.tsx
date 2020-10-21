import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';

import { ISchedulingModel } from './stores/SchedulingStore';

interface ISchedulingProps {
  scheduling?: ISchedulingModel;
}

const Scheduling = ({
  scheduling,
}: ISchedulingProps): JSX.Element => {
  console.log('Scheduling', getSnapshot(scheduling));

  useEffect(() => {
    scheduling.setScheduling('new SCHEDULING');
  }, []);

  return <div>Scheduling</div>;
};

export default inject(({ newCampaignSettings }) => ({
  scheduling: newCampaignSettings.scheduling,
}))(observer(Scheduling));
