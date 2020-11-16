import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import QuestionTooltip from 'sharedComponents/QuestionTooltip';
import { TSettingsModel } from '../../stores/SettingsStore';
import Groups from '../Groups';

interface INameAndGroupProps {
  settings?: TSettingsModel;
}

const NameAndGroup = ({
  settings,
}: INameAndGroupProps): JSX.Element => {
  return (
    <Grid container alignItems="flex-end">
      <Grid xs={4} item>
        <TextField
          value={settings.name}
          onChange={(event): void =>
            settings.setName(event.target.value as string)
          }
          label="Campaign name"
          fullWidth
        />
      </Grid>
      <QuestionTooltip title="We recommend: Product - Country - Site & Adspot if targeted. Example : My product - USA - Site.com Header." />
      <Groups />
    </Grid>
  );
};

export default inject(({ newCampaignSettings }) => ({
  settings: newCampaignSettings.settings,
}))(observer(NameAndGroup));
