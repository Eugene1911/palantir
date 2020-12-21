import React from 'react';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import useStyles from './useStyles';

interface IFilterHeaderProps {
  onCancel: () => void;
  clearAllFilters?: () => void;
  title: string;
  withBackButton?: boolean;
  withCloseButton?: boolean;
  withClearButton?: boolean;
}

const FilterHeader = ({
  title,
  onCancel,
  withBackButton,
  withCloseButton,
  withClearButton,
  clearAllFilters,
}: IFilterHeaderProps): JSX.Element => {
  const classes = useStyles();

  const handleClear = (): void => {
    if (clearAllFilters) {
      clearAllFilters();
    }
    onCancel();
  };

  return (
    <>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.header}
      >
        {withBackButton && (
          <Grid className={classes.back} item>
            <IconButton size="small" onClick={onCancel}>
              <ArrowBackIcon className={classes.close} />
            </IconButton>
          </Grid>
        )}
        <Grid className={classes.titleWrapper} item>
          <Typography className={classes.title}>{title}</Typography>
        </Grid>
        {withCloseButton && (
          <Grid item>
            <IconButton size="small" onClick={onCancel}>
              <CloseIcon className={classes.close} />
            </IconButton>
          </Grid>
        )}
        {withClearButton && (
          <Grid item>
            <Button
              onClick={handleClear}
              className={classes.clearFilters}
              color="primary"
            >
              Clear
            </Button>
          </Grid>
        )}
      </Grid>
      <Divider classes={{ root: classes.divider }} />
    </>
  );
};

export default FilterHeader;
