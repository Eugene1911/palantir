import React from 'react';
import Typography from '@material-ui/core/Typography';
import Accordion, { ITab } from 'sharedComponents/Accordion';
import { ReactComponent as AudienceIcon } from './assets/images/audienceIcon.svg';

function Audience(): JSX.Element {
  const tabs: ITab[] = [
    {
      leftSide: <Typography>Traffic selection</Typography>,
      rightSide: <Typography>Buttons</Typography>,
    },
  ];

  return (
    <Accordion
      title="Audience"
      icon={AudienceIcon}
      isSelected
      subInfo1="column 1"
      subInfo2="column 2"
      subInfo3="column 3"
      tabs={tabs}
    >
      <>
        <Typography>Traffic selection</Typography>
      </>
    </Accordion>
  );
}
export default Audience;
