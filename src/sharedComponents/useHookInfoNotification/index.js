import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack';
import { AUTO_HIDE_DURATION } from 'config/constants';

function useHookInfoNotification() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return ({ message, variant }) => {
    const anchorOrigin = {
      vertical: 'bottom',
      horizontal: 'right',
    };
    const action = key => (
      <IconButton onClick={() => closeSnackbar(key)}>
        <CloseIcon />
      </IconButton>
    );

    enqueueSnackbar(message, {
      variant,
      autoHideDuration: AUTO_HIDE_DURATION,
      anchorOrigin,
      action,
    });
  };
}

export default useHookInfoNotification;
