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
import { TAdFormatModel } from '../../stores/models/AdFormat';
import { TPermissionsStore } from '../../../../stores/PermissionsStore';

interface IAdFormatProps {
  adFormat?: TAdFormatModel;
  permissions?: TPermissionsStore;
  filterCategoriesByAdFormat?: (name: string) => void;
}

const AdFormat = ({
  adFormat,
  permissions,
  filterCategoriesByAdFormat,
}: IAdFormatProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();

  useEffect(() => {
    if (
      adFormat.adFormatListStatus === LoadingStatus.INITIAL &&
      permissions.permissionsStatus === LoadingStatus.SUCCESS
    ) {
      adFormat.getAdFormatList(infoNotification, permissions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions.permissionsStatus]);

  return (
    <Grid alignItems="flex-start" container>
      <Grid xs={3} item>
        {adFormat.adFormatListStatus === LoadingStatus.LOADING ? (
          <FilterLoader />
        ) : (
          <FormControl
            fullWidth
            error={
              adFormat.adFormatListStatus === LoadingStatus.ERROR
            }
          >
            <InputLabel>Ad Format</InputLabel>
            <Select
              value={adFormat.adFormat || ''}
              onChange={(event): void =>
                adFormat.setAdFormat(
                  event.target.value as number,
                  filterCategoriesByAdFormat,
                )
              }
            >
              {adFormat.adFormatList.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
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
  adFormat: newCampaignSettings.settings.adFormat,
  filterCategoriesByAdFormat:
    newCampaignSettings.settings.categories
      .filterCategoriesByAdFormat,
  permissions: newCampaignSettings.permissions,
}))(observer(AdFormat));
