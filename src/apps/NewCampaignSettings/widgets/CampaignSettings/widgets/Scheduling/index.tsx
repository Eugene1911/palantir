import React from 'react';
import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';

import Event from '@material-ui/icons/Event';
import AccordionPanel from 'sharedComponents/Accordion';
import { TSchedulingModel } from './stores/SchedulingStore';

interface ISchedulingProps {
  scheduling?: TSchedulingModel;
}

const Scheduling = ({
  scheduling,
}: ISchedulingProps): JSX.Element => {
  console.log('Scheduling', getSnapshot(scheduling));

  return (
    <AccordionPanel
      Icon={Event}
      title="Scheduling"
      isSelected={false}
    />
  );
};

export default inject(({ newCampaignSettings }) => ({
  scheduling: newCampaignSettings.scheduling,
}))(observer(Scheduling));
