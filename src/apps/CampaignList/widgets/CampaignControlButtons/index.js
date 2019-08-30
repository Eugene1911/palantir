import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Archive from '@material-ui/icons/Archive';
import FileCopy from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import CampaignRejactDialog from 'sharedWidgets/CampaignRejactDialog';
import CloneCampaignMenu from './components/CloneCampaignMenu';
import useCloneMenuState from './services/cloneMenuState/useCloneMenuState';
import useApproveRejectReducer from './services/approveRejectReducer';
import useArchiveReducer from './services/archiveReducer';
import {
  getCampaignControlButtonPlayPauseStatusIcon,
  getCampaignControlButtonApproveRejectStatusIcon,
} from './services/getCampaignControlButtonsStatusIcon';
import useCampaignPlayPauseReducer from './services/playPauseReducer/useCampaignPlayPauseReducer';
import useRejectReasosnsState from './services/rejectReasosnsState';

function CampaignControlButtons({ id, approved, status }) {
  const {
    isOpenDialogRejectReasosns,
    setDialogRejectReasosnsState,
  } = useRejectReasosnsState();
  const {
    isDisabledArchiveButton,
    onChangeArchiveHandler,
  } = useArchiveReducer(status, id);
  const {
    approveRejectState,
    nextApproveStatus,
    onHandlerRejectCampaign,
    onChangeApproveStatusHandler,
  } = useApproveRejectReducer(
    approved,
    id,
    setDialogRejectReasosnsState,
  );
  const {
    campaignStatus,
    changeCampaignStatusHandler,
    isDisabledStatusButton,
    titleStatusToolTip,
  } = useCampaignPlayPauseReducer(status);
  const {
    cloneMenuState,
    cloneCampaignState,
    campaignCloneMenuId,
    onClickCloneMenuHandler,
  } = useCloneMenuState(id);
  const isArchived = status === 'archived';

  return (
    <div>
      <CloneCampaignMenu
        onChange={onClickCloneMenuHandler}
        menuState={cloneMenuState}
        menuId={campaignCloneMenuId}
      />
      {isOpenDialogRejectReasosns && (
        <CampaignRejactDialog
          onHandlerRejectCampaign={onHandlerRejectCampaign}
          campaignId={id}
          open={isOpenDialogRejectReasosns}
          onClose={setDialogRejectReasosnsState}
        />
      )}
      <ButtonGroup
        fullWidth
        color="primary"
        size="small"
        variant="outlined"
      >
        <Tooltip title="Archive">
          <Button
            disabled={isArchived || isDisabledArchiveButton}
            onClick={onChangeArchiveHandler}
          >
            <Archive fontSize="inherit" />
          </Button>
        </Tooltip>
        <Tooltip title={`Change to ${nextApproveStatus}`}>
          <Button
            onClick={onChangeApproveStatusHandler}
            disabled={isArchived || approveRejectState.isFetching}
          >
            {getCampaignControlButtonApproveRejectStatusIcon(
              approveRejectState.approvStatus,
            )}
          </Button>
        </Tooltip>
        <Tooltip title="Clone Campaign">
          <Button
            disabled={isArchived || cloneCampaignState.isFetching}
            onClick={({ currentTarget }) =>
              onClickCloneMenuHandler(currentTarget)
            }
            aria-label="more"
            aria-controls={campaignCloneMenuId}
            aria-haspopup="true"
          >
            <FileCopy fontSize="inherit" />
          </Button>
        </Tooltip>
        <Tooltip title={titleStatusToolTip}>
          <Button
            onClick={() =>
              changeCampaignStatusHandler(id, campaignStatus)
            }
            disabled={isArchived || isDisabledStatusButton}
          >
            {getCampaignControlButtonPlayPauseStatusIcon(
              campaignStatus,
            )}
          </Button>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
}

CampaignControlButtons.propTypes = {
  approved: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default CampaignControlButtons;
