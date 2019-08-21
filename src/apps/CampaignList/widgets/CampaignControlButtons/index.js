import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import BarChart from '@material-ui/icons/BarChart';
import Edit from '@material-ui/icons/Edit';
import FileCopy from '@material-ui/icons/FileCopy';
import PlayArrow from '@material-ui/icons/PlayArrow';

function CampaignControlButtons() {
  return (
    <ButtonGroup
      fullWidth
      color='primary'
      size='small'
      variant='outlined'
    >
      <Button>
        <BarChart fontSize='inherit' />
      </Button>
      <Button>
        <Edit fontSize='inherit' />
      </Button>
      <Button>
        <FileCopy fontSize='inherit' />
      </Button>
      <Button>
        <PlayArrow fontSize='inherit' />
      </Button>
    </ButtonGroup>
  );
}

export default CampaignControlButtons;
