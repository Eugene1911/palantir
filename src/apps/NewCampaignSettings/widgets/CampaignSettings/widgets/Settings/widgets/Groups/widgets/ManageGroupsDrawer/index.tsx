import React, { useState } from 'react';

import Drawer from '@material-ui/core/Drawer';
import { inject, observer } from 'mobx-react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
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
          <Button
            color="primary"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={toggleOpenNewDrawer}
          >
            New Group
          </Button>
        </Container>
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
