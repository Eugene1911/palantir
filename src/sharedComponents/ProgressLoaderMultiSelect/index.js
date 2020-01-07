import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

function ProgressLoaderMultiSelect({ isLoading }) {
  if (isLoading) {
    return <CircularProgress color="inherit" size={20} />;
  }

  return null;
}

ProgressLoaderMultiSelect.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default ProgressLoaderMultiSelect;
