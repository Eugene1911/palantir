import React from 'react';
import { inject, observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';
import { TAudienceModel } from '../../stores/AudienceStore';
import { buttonsConst } from '../../assets/constants/buttonsConst';
import useStyles from './useStyles';

interface IAddSpotsButton {
  audience?: TAudienceModel;
  customAdd?: (prime: boolean) => void;
}

function AddSpotsButton(props: IAddSpotsButton): JSX.Element {
  const { audience, customAdd } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (prime: boolean) => {
    setAnchorEl(null);
    customAdd ? customAdd(prime) : audience.addAllSpots(prime);
  };

  return (
    <Grid container justify="flex-end">
      <Button color="primary" onClick={handleClick}>
        <AddIcon />
        <Typography>{buttonsConst.addSpots}</Typography>
      </Button>
      <Menu
        id="simple-menu"
        classes={classes}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose(true)}>
          {buttonsConst.addPrime}
        </MenuItem>
        <MenuItem onClick={() => handleClose(false)}>
          {buttonsConst.addMembersArea}
        </MenuItem>
      </Menu>
    </Grid>
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  audience: CampaignAudienceAndPricingStore.audience,
}))(observer(AddSpotsButton));
