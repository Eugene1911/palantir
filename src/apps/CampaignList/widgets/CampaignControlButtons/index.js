import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FileCopy from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import useCampaignStatusReducer from './services/useCampaignStatusReducer';
import {
  getCampaignControlButtonPlayPauseStatusIcon,
  getCampaignControlButtonApproveRejectStatusIcon,
} from './services/getCampaignControlButtonsStatusIcon';

function CampaignControlButtons({ id, status }) {
  const {
    campaignStatus,
    changeCampaignStatusHandler,
    isDisabledStatusButton,
    titleStatusToolTip,
  } = useCampaignStatusReducer(status);

  return (
    <ButtonGroup
      fullWidth
      color='primary'
      size='small'
      variant='outlined'
    >
      <Tooltip title={campaignStatus}>
        <Button>
          {getCampaignControlButtonApproveRejectStatusIcon(
            campaignStatus,
          )}
        </Button>
      </Tooltip>

      <Tooltip title='Clone Campaign'>
        <Button>
          <FileCopy fontSize='inherit' />
        </Button>
      </Tooltip>

      <Button
        title={titleStatusToolTip}
        onClick={() =>
          changeCampaignStatusHandler(id, campaignStatus)
        }
        disabled={isDisabledStatusButton}
      >
        <Tooltip title={campaignStatus}>
          {getCampaignControlButtonPlayPauseStatusIcon(
            campaignStatus,
          )}
        </Tooltip>
      </Button>
    </ButtonGroup>
  );
}

CampaignControlButtons.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default CampaignControlButtons;
