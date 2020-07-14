import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

function ButtonWithLoading({
  isPending,
  isDisabled,
  onClick,
  label,
}) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="primary"
        disabled={isPending || isDisabled}
        onClick={onClick}
        fullWidth
      >
        {label}
      </Button>
      {isPending && (
        <CircularProgress
          size={24}
          className={classes.buttonProgress}
        />
      )}
    </div>
  );
}

ButtonWithLoading.propTypes = {
  isDisabled: PropTypes.bool,
  isPending: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

ButtonWithLoading.defaultProps = {
  isDisabled: false,
  isPending: false,
};

export default ButtonWithLoading;
