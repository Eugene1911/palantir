import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { LoadingStatus } from 'sharedTypes';
import CircularProgress from '@material-ui/core/CircularProgress';
import debounce from 'lodash/debounce';
import FilterLoader from 'sharedComponents/loaders/FilterLoader';
import QuestionTooltip from 'sharedComponents/QuestionTooltip';
import {
  TGroupModel,
  TGroupsModel,
} from '../../stores/models/Groups';
import ManageGroupsDrawer from './widgets/ManageGroupsDrawer';
import useStyles from './useStyles';

interface IGroupsProps {
  groups?: TGroupsModel;
}

const Groups = ({ groups }: IGroupsProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();
  const classes = useStyles();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');

  const toggleOpenDrawer = (): void =>
    setIsOpenDrawer(prevOpen => !prevOpen);

  useEffect(() => {
    if (groups.groupListStatus === LoadingStatus.INITIAL) {
      groups.getGroupList(infoNotification);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups.groupListStatus, groups.getGroupList, infoNotification]);

  const handleChangeSearch = (
    event: ChangeEvent<{}>,
    value: string | TGroupModel,
  ): void => {
    if (typeof value === 'object') {
      groups.setGroup(value);
    }
  };

  const loadGroups = useCallback(
    debounce(
      (value: string) =>
        groups.searchGroupByName(infoNotification, value),
      500,
    ),
    [],
  );

  const handleInputChange = (evt, value): void => {
    setInputText(value);
    loadGroups(value);
  };

  const searchLoading =
    groups.searchGroupListStatus === LoadingStatus.LOADING;

  return (
    <>
      <Grid xs={3} item className={classes.select}>
        {groups.groupListStatus === LoadingStatus.LOADING ? (
          <FilterLoader />
        ) : (
          <Autocomplete
            options={
              inputText ? groups.searchGroupList : groups.groupList
            }
            getOptionLabel={(option: TGroupModel): string =>
              option.name
            }
            value={groups.group || null}
            onChange={handleChangeSearch}
            onInputChange={handleInputChange}
            renderInput={(params): JSX.Element => (
              <TextField
                {...params} // eslint-disable-line react/jsx-props-no-spreading
                label="Group"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {searchLoading ? (
                        <CircularProgress color="primary" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        )}
      </Grid>
      {groups.groupListStatus === LoadingStatus.SUCCESS && (
        <>
          <QuestionTooltip title="Groups allow you to classify your ad campaigns by groups in the campaign listing page." />
          <Grid item>
            <Button
              onClick={toggleOpenDrawer}
              color="primary"
              className={classes.manage}
            >
              Manage groups
            </Button>
          </Grid>
        </>
      )}
      <ManageGroupsDrawer
        isOpen={isOpenDrawer}
        onCancel={toggleOpenDrawer}
      />
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  groups: newCampaignSettings.settings.groups,
}))(observer(Groups));
