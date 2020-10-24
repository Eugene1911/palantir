import React from 'react';
import Accordion, { ITab } from 'sharedComponents/Accordion';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import createTabs from './services/createTabs';
import { TAudienceModel } from './stores/AudienceStore';

interface IAudienceProps {
  audience?: TAudienceModel;
}

function Audience({ audience }: IAudienceProps): JSX.Element {
  const tabs: ITab[] = createTabs({
    trafficType: audience.trafficType,
    onTrafficTypeChange: audience.setTrafficType,
  });

  console.log('audience', audience);
  console.log('audience snap', getSnapshot(audience));

  return (
    <Accordion
      title="Audience"
      Icon={SupervisedUserCircle}
      isSelected
      subInfo1="column 1"
      subInfo2="column 2"
      subInfo3="column 3"
      tabs={tabs}
    />
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  audience: CampaignAudienceAndPricingStore.audience,
}))(observer(Audience));
