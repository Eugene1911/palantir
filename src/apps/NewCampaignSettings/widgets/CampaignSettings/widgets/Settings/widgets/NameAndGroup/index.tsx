import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { LoadingStatus } from 'sharedTypes';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FilterLoader from 'sharedComponents/loaders/FilterLoader';
import QuestionTooltip from 'sharedComponents/QuestionTooltip';
// import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import { TSettingsModel } from '../../stores/SettingsStore';

import useStyles from './useStyles';

interface INameAndGroupProps {
  settings?: TSettingsModel;
}

const NameAndGroup = ({
  settings,
}: INameAndGroupProps): JSX.Element => {
  const classes = useStyles();
  // const infoNotification = useHookInfoNotification();

  // TODO доделать, когда появится vpn
  // useEffect(() => {
  //   if (settings.groupListStatus === LoadingStatus.INITIAL) {
  //     settings.getGroupList(infoNotification);
  //   }
  // });

  return (
    <Grid
      className={classes.container}
      container
      alignItems="flex-end"
    >
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
      <Grid xs={3} item className={classes.select}>
        {settings.groupListStatus === LoadingStatus.LOADING ? (
          <FilterLoader />
        ) : (
          <FormControl
            fullWidth
            error={settings.groupListStatus === LoadingStatus.ERROR}
          >
            <InputLabel>Group</InputLabel>
            <Select
              value={settings.group || ''}
              onChange={(event): void =>
                settings.setGroup(event.target.value as number)
              }
            >
              {settings.groupList.map(group => (
                <MenuItem key={group.id} value={group.id}>
                  {group.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Grid>
      <QuestionTooltip title="Groups allow you to classify your ad campaigns by groups in the campaign listing page." />
      <Grid item>
        <Button color="primary" className={classes.manage}>
          Manage groups
        </Button>
      </Grid>
    </Grid>
  );
};

export default inject(({ newCampaignSettings }) => ({
  settings: newCampaignSettings.settings,
}))(observer(NameAndGroup));
