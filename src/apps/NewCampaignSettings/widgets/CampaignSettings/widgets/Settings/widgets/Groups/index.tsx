import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { LoadingStatus } from 'sharedTypes';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FilterLoader from 'sharedComponents/loaders/FilterLoader';
import QuestionTooltip from 'sharedComponents/QuestionTooltip';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import { TGroupsModel } from '../../stores/models/Groups';
import useStyles from './useStyles';

interface IGroupsProps {
  groups?: TGroupsModel;
}

const Groups = ({ groups }: IGroupsProps): JSX.Element => {
  const classes = useStyles();
  const infoNotification = useHookInfoNotification();

  useEffect(() => {
    if (groups.groupListStatus === LoadingStatus.INITIAL) {
      groups.getGroupList(infoNotification);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups.groupListStatus, groups.getGroupList, infoNotification]);

  return (
    <>
      <Grid xs={3} item className={classes.select}>
        {groups.groupListStatus === LoadingStatus.LOADING ? (
          <FilterLoader />
        ) : (
          <FormControl
            fullWidth
            error={groups.groupListStatus === LoadingStatus.ERROR}
          >
            <InputLabel>Group</InputLabel>
            <Select
              value={groups.group || ''}
              onChange={(event): void =>
                groups.setGroup(event.target.value as number)
              }
            >
              {groups.groupList.map(group => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
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
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  groups: newCampaignSettings.settings.groups,
}))(observer(Groups));
