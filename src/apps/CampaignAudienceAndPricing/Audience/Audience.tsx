import React from 'react';
import Accordion, { ITab } from 'sharedComponents/Accordion';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import createTabs from './assets/utils/createTabs';
import { ETrafficType } from './assets/constants/trafficTypes';

function Audience(): JSX.Element {
  const [trafficType, setTrafficType] = React.useState(
    ETrafficType.RON,
  );
  const tabs: ITab[] = createTabs({
    scheme: trafficType,
    onTrafficTypeChange: setTrafficType,
  });

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
