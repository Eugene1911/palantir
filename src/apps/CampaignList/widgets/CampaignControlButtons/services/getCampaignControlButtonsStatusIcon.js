import React from 'react';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Block from '@material-ui/icons/Block';
import Done from '@material-ui/icons/Done';

export function getCampaignControlButtonPlayPauseStatusIcon(status) {
  switch (status) {
    case 'enabled':
      return <PlayArrow fontSize='inherit' />;
    default:
      return <Pause fontSize='inherit' />;
  }
}

export function getCampaignControlButtonApproveRejectStatusIcon(
  status,
) {
  switch (status) {
    case 'rejected':
      return <Done fontSize='inherit' />;
    default:
      return <Block fontSize='inherit' />;
  }
}
