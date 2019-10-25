import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

function ButtonWithLoading({ isPending, onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="primary"
        disabled={isPending}
        onClick={onClick}
        fullWidth
      >
        Accept terms
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
  isPending: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

ButtonWithLoading.defaultProps = {
  isPending: false,
};

export default ButtonWithLoading;
