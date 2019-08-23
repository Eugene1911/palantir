import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useCampaignChangeStatusResources from './services/useCampaignChangeStatusResources';
import useCampaignChangeStatus from './services/useCampaignChangeStatus';

function CampaignChangeStatus({ id, status }) {
  const { campaignStatusesList } = useCampaignChangeStatusResources();
  const {
    campaignStatus,
    onChangeCampaignStatusHandler,
  } = useCampaignChangeStatus(status);

  return (
    <FormControl fullWidth>
      <Select
        onChange={onChangeCampaignStatusHandler(id)}
        name='status'
        value={campaignStatus}
      >
        {campaignStatusesList.map(({ name, value }) => (
          <MenuItem key={value} value={value}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

CampaignChangeStatus.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default CampaignChangeStatus;
