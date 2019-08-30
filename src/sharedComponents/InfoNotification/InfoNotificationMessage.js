import React from 'react';
import PropTypes from 'prop-types';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import useStyles from './styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

function InfoNotificationMessage({ variant, message }) {
  const classes = useStyles();
  const Icon = variantIcon[variant];

  return (
    <span className={classes.message}>
      <Icon fontSize="small" className={classes.iconVariant} />
      {message}
    </span>
  );
}

InfoNotificationMessage.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default InfoNotificationMessage;
