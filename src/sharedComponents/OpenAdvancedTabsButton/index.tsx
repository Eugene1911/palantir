import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';

import useStyles from './useStyles';

interface IOpenAdvancedTabsButtonProps {
  isAdvancedOpen: boolean;
  toggleIsAdvancedOpen: () => void;
}

const OpenAdvancedTabsButton = ({
  isAdvancedOpen,
  toggleIsAdvancedOpen,
}: IOpenAdvancedTabsButtonProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Button
        className={classes.button}
        onClick={toggleIsAdvancedOpen}
        endIcon={isAdvancedOpen ? <ArrowDropUp /> : <ArrowDropDown />}
      >
        Advanced
      </Button>
    </Grid>
  );
};

export default OpenAdvancedTabsButton;
