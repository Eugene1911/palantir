import React from 'react';
import Accordion, { ITab } from 'sharedComponents/Accordion';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import createTabs from './services/createTabs';

function Audience(): JSX.Element {
  const tabs: ITab[] = createTabs();

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

export default Audience;
