import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilterLoader from 'sharedComponents/loaders/FilterLoader';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import { LoadingStatus } from 'sharedTypes';
import { TSettingsModel } from '../../stores/SettingsStore';

interface IAdFormatProps {
  settings?: TSettingsModel;
}

const AdFormat = ({ settings }: IAdFormatProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();

  useEffect(() => {
    if (settings.adFormatListStatus === LoadingStatus.INITIAL) {
      settings.getAdFormatList(infoNotification);
    }
  }, []);

  return (
    <Grid alignItems="flex-start" container>
      <Grid xs={3} item>
        {settings.adFormatListStatus === LoadingStatus.LOADING ? (
          <FilterLoader />
        ) : (
          <FormControl
            fullWidth
            error={
              settings.adFormatListStatus === LoadingStatus.ERROR
            }
          >
            <InputLabel>Ad Format</InputLabel>
            <Select
              value={settings.adFormat || ''}
              onChange={(event): void =>
                settings.setAdFormat(event.target.value as number)
              }
            >
              {settings.adFormatList.map(adFormat => (
                <MenuItem key={adFormat.id} value={adFormat.id}>
                  {adFormat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Grid>
    </Grid>
  );
};

export default inject(({ newCampaignSettings }) => ({
  settings: newCampaignSettings.settings,
}))(observer(AdFormat));
