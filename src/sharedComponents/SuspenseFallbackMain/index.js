import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';

function SuspenseFallbackMain() {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <CircularProgress />
    </div>
  );
}

export default SuspenseFallbackMain;
