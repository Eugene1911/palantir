import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import { AUTO_HIDE_DURATION } from 'config/constants';
import useStyles from './styles';
import InfoNotificationMessage from './InfoNotificationMessage';

const anchorOrigin = {
  horizontal: 'right',
  vertical: 'bottom',
};

function InfoNotification({ isOpen, message, onClose, variant }) {
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      onClose={onClose}
      autoHideDuration={AUTO_HIDE_DURATION}
      open={isOpen}
    >
      <SnackbarContent
        className={classes[variant]}
        aria-describedby="client-snackbar"
        message={
          <InfoNotificationMessage
            variant={variant}
            message={message}
          />
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

InfoNotification.propTypes = {
  isOpen: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
};
InfoNotification.defaultProps = {
  isOpen: false,
  message: '',
  variant: 'success',
};

export default InfoNotification;
