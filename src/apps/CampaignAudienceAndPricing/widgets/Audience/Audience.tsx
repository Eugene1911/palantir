import React from 'react';
import Typography from '@material-ui/core/Typography';
import Accordion from 'sharedComponents/Accordion';
import { ReactComponent as AudienceIcon } from './assets/images/audienceIcon.svg';

function Audience(): JSX.Element {
  return (
    <Accordion summary="Audience" icon={AudienceIcon}>
      <>
        <Typography>Traffic selection</Typography>
      </>
    </Accordion>
  );
}
export default Audience;
