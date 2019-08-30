import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const cloneCampaignMenuItems = [
  {
    name: 'Clone',
    id: 'clone',
  },
  {
    name: 'Clone as Prime',
    id: 'save_as',
  },
];

function CloneCampaignMenu({ onChange, menuState, menuId }) {
  const onClose = id => onChange(null, id);
  const isOpen = !!menuState;

  return (
    <Menu
      anchorEl={menuState}
      id={menuId}
      keepMounted
      open={isOpen}
      onClose={onClose}
    >
      {cloneCampaignMenuItems.map(({ name, id }) => (
        <MenuItem key={name} onClick={() => onClose(id)}>
          {name}
        </MenuItem>
      ))}
    </Menu>
  );
}

CloneCampaignMenu.propTypes = {
  menuId: PropTypes.string.isRequired,
  menuState: PropTypes.oneOfType([() => null, PropTypes.bool]),
  onChange: PropTypes.func.isRequired,
};
CloneCampaignMenu.defaultProps = {
  menuState: null,
};

export default CloneCampaignMenu;
