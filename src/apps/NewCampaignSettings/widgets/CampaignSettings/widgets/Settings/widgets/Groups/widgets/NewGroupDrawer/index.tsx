import React, { useEffect, useState } from 'react';

import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import FilterLoader from 'sharedComponents/loaders/FilterLoader';
import { LoadingStatus } from 'sharedTypes';
import { inject, observer } from 'mobx-react';
import FilterHeader from '../../../../../../components/CustomDrawer/components/FilterHeader';
import useStyles from './useStyles';
import { TGroupsModel } from '../../../../stores/models/Groups';
import FilterFooter from '../../../../../../components/CustomDrawer/components/FilterFooter';

interface INewGroupDrawerProps {
  isOpen: boolean;
  onCancel: () => void;
  groups?: TGroupsModel;
}

const NewGroupDrawer = ({
  isOpen,
  onCancel,
  groups,
}: INewGroupDrawerProps): JSX.Element => {
  const classes = useStyles();
  const infoNotification = useHookInfoNotification();
  const [name, setName] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    setIsDisabled(!name);
  }, [name]);

  const handleSave = (): void => {
    groups.createCampaignGroup(infoNotification, name, handleClose);
  };

  const handleClose = (): void => {
    setName('');
    onCancel();
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={handleClose}
        ModalProps={{ BackdropProps: { invisible: true } }}
      >
        <FilterHeader
          onCancel={handleClose}
          title="New group"
          withBackButton
        />
        <Box className={classes.content}>
          <TextField
            value={name}
            onChange={(event): void =>
              setName(event.target.value as string)
            }
            label="Group Name"
            fullWidth
          />
          {groups.groupActionStatus === LoadingStatus.LOADING && (
            <div>
              <FilterLoader />
            </div>
          )}
        </Box>
        <FilterFooter
          selectedCount={0}
          onCancel={handleClose}
          onSave={handleSave}
          isShowSelectedCount={false}
          saveText="Save"
          isSaveDisabled={isDisabled}
        />
      </Drawer>
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  groups: newCampaignSettings.settings.groups,
}))(observer(NewGroupDrawer));
