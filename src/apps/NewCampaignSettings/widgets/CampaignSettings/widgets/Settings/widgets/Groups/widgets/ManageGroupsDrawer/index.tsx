import React, { useState } from 'react';

import Drawer from '@material-ui/core/Drawer';
import { LoadingStatus } from 'sharedTypes';
import { inject, observer } from 'mobx-react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import FilterSearch from '../../../../../../components/CustomDrawer/components/FilterSearch';
import FilterHeader from '../../../../../../components/CustomDrawer/components/FilterHeader';
import useStyles from './useStyles';
import {
  TGroupsModel,
  TGroupModel,
} from '../../../../stores/models/Groups';
import NewGroupDrawer from '../NewGroupDrawer';
import UpdateGroupDrawer from '../UpdateGroupDrawer';
import GroupListItem from '../GroupListItem';
import FilterFooter from '../../../../../../components/CustomDrawer/components/FilterFooter';

interface IManageGroupsDrawerProps {
  isOpen: boolean;
  onCancel: () => void;
  groups?: TGroupsModel;
}

const ManageGroupsDrawer = ({
  isOpen,
  onCancel,
  groups,
}: IManageGroupsDrawerProps): JSX.Element => {
  const infoNotification = useHookInfoNotification();
  const classes = useStyles();
  const [inputText, setInputText] = useState<string>('');
  const [isOpenNewDrawer, setIsOpenNewDrawer] = useState<boolean>(
    false,
  );
  const [activeGroup, setActiveGroup] = useState<TGroupModel | null>(
    null,
  );

  const toggleOpenNewDrawer = (): void =>
    setIsOpenNewDrawer(prevOpen => !prevOpen);

  const openUpdateDrawer = (group: TGroupModel): void =>
    setActiveGroup(group);

  const closeUpdateDrawer = (): void => setActiveGroup(null);

  return (
    <>
      <Drawer anchor="right" open={isOpen} onClose={onCancel}>
        <FilterHeader
          onCancel={onCancel}
          title="Manage groups"
          withCloseButton
        />
        <FilterSearch
          inputText={inputText}
          setInputText={setInputText}
        />
        <Container className={classes.content}>
          {groups.groupList.map(group => (
            <GroupListItem
              inputText={inputText}
              openUpdateDrawer={openUpdateDrawer}
              group={group}
              key={group.id}
            />
          ))}
          {groups.currentPage < groups.pagesCount && (
            <Grid container justify="center">
              <Button
                color="primary"
                className={classes.loadButton}
                disabled={
                  groups.groupListStatus === LoadingStatus.LOADING
                }
                onClick={(): void =>
                  groups.loadMoreGroups(infoNotification)
                }
              >
                Load more groups
              </Button>
            </Grid>
          )}
        </Container>
        <FilterFooter
          selectedCount={0}
          isShowSelectedCount={false}
          customLeftButton={
            <Button
              color="primary"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={toggleOpenNewDrawer}
            >
              New Group
            </Button>
          }
        />
      </Drawer>
      <NewGroupDrawer
        onCancel={toggleOpenNewDrawer}
        isOpen={isOpenNewDrawer}
      />
      {!!activeGroup && (
        <UpdateGroupDrawer
          isOpen={!!activeGroup}
          onCancel={closeUpdateDrawer}
          group={activeGroup}
        />
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  groups: newCampaignSettings.settings.groups,
}))(observer(ManageGroupsDrawer));
