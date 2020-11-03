import React from 'react';
import { inject } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import Accordion, { ITab } from 'sharedComponents/Accordion';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import createTabs from './services/createTabs';
import { TAudienceModel } from './stores/AudienceStore';
import IDTableController from './widgets/IDTable';

interface IAudience {
  audience?: TAudienceModel;
}

function Audience(props?: IAudience): JSX.Element {
  const tabs: ITab[] = createTabs();

  props.audience.getSpotsData();
  props.audience.getSitesData();
  console.log('store', getSnapshot(props.audience));
  return (
    <>
      <Accordion
        title="Audience"
        Icon={SupervisedUserCircle}
        isSelected
        subInfo1="column 1"
        subInfo2="column 2"
        subInfo3="column 3"
        tabs={tabs}
      />
      <IDTableController />
    </>
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  audience: CampaignAudienceAndPricingStore.audience,
}))(Audience);
