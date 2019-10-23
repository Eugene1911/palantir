import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

function ButtonWithLoading({ pending, onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="primary"
        disabled={pending}
        onClick={onClick}
        fullWidth
      >
        Accept terms
      </Button>
      {pending && (
        <CircularProgress
          size={24}
          className={classes.buttonProgress}
        />
      )}
    </div>
  );
}

ButtonWithLoading.propTypes = {
  onClick: PropTypes.func.isRequired,
  pending: PropTypes.bool,
};

ButtonWithLoading.defaultProps = {
  pending: false,
};

export default ButtonWithLoading;
