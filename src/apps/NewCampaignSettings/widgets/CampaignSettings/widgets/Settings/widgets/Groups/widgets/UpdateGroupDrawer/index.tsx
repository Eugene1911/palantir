import React, { useEffect, useState } from 'react';

import match from 'autosuggest-highlight/match';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import FilterLoader from 'sharedComponents/loaders/FilterLoader';
import { LoadingStatus } from 'sharedTypes';
import { inject, observer } from 'mobx-react';
import FilterFooter from '../../../../../../components/CustomDrawer/components/FilterFooter';
import FilterSearch from '../../../../../../components/CustomDrawer/components/FilterSearch';
import FilterHeader from '../../../../../../components/CustomDrawer/components/FilterHeader';
import useStyles from './useStyles';
import {
  TGroupsModel,
  TGroupModel,
} from '../../../../stores/models/Groups';
import CampaignListItem from '../CampaignListItem';
import { useFetchMoreInModal } from '../../services/useFetchMore';

interface IUpdateGroupDrawerProps {
  isOpen: boolean;
  onCancel: () => void;
  groups?: TGroupsModel;
  group: TGroupModel;
  getAdFormatNameById?: (id: number) => string | undefined;
}

const UpdateGroupDrawer = ({
  isOpen,
  onCancel,
  groups,
  group,
  getAdFormatNameById,
}: IUpdateGroupDrawerProps): JSX.Element => {
  const classes = useStyles();
  const infoNotification = useHookInfoNotification();
  const [name, setName] = useState<string>(group.name);
  const [inputText, setInputText] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(!group.name);
  const [arrayForDelete, setArrayForDelete] = useState<number[]>([]);

  useEffect(() => {
    setIsDisabled(!name);
  }, [name]);

  const handleLoadMoreCampaigns = (): void => {
    if (group.currentPage < group.pagesCount) {
      setIsDisabled(true);
      groups.loadMoreCampaigns(
        infoNotification,
        group,
        () => setIsDisabled(false),
        getAdFormatNameById,
      );
    }
  };

  const { listRef } = useFetchMoreInModal(handleLoadMoreCampaigns);

  const handleSave = (): void => {
    groups.updateCampaignGroup(
      infoNotification,
      group.id,
      name,
      arrayForDelete,
      onCancel,
    );
  };

  const handleAddForDelete = (id): void => {
    const newArrayForDelete = [...arrayForDelete];
    if (!newArrayForDelete.includes(id)) {
      newArrayForDelete.push(id);
      setArrayForDelete(newArrayForDelete);
    }
  };

  const handleDelete = (): void => {
    groups.deleteCampaignGroup(infoNotification, group.id, onCancel);
  };

  return (
    <>
      <Drawer anchor="right" open={isOpen} onClose={onCancel}>
        <FilterHeader
          onCancel={onCancel}
          title={group.name}
          withBackButton
        />
        <Box className={classes.content} {...{ ref: listRef }}>
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
          {!!group.list.length && (
            <FilterSearch
              inputText={inputText}
              setInputText={setInputText}
              noPadding
            />
          )}
          {group.list
            .filter(item => !arrayForDelete.includes(item.id))
            .filter(
              item =>
                !(inputText && !match(item.name, inputText).length),
            )
            .map(item => (
              <Grid key={item.id} container alignItems="center">
                <CampaignListItem campaign={item} />
                <IconButton
                  size="small"
                  className={classes.icon}
                  onClick={(): void => handleAddForDelete(item.id)}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            ))}
        </Box>
        <FilterFooter
          selectedCount={0}
          onCancel={onCancel}
          onSave={handleSave}
          isShowSelectedCount={false}
          saveText="Save"
          isSaveDisabled={isDisabled}
          customLeftButton={
            <Button className={classes.button} onClick={handleDelete}>
              Delete group
            </Button>
          }
        />
      </Drawer>
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  groups: newCampaignSettings.settings.groups,
  getAdFormatNameById:
    newCampaignSettings.settings.adFormat.getAdFormatNameById,
}))(observer(UpdateGroupDrawer));
