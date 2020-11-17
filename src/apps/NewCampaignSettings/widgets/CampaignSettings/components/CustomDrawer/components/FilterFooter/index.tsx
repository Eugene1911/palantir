import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './useStyles';

interface IFilterFooterProps {
  selectedCount: number;
  onCancel: () => void;
  onSave: () => void;
}

const FilterFooter = ({
  selectedCount,
  onCancel,
  onSave,
}: IFilterFooterProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.footer}
      container
      justify="space-between"
      alignItems="center"
    >
      <Typography color="primary">
        {selectedCount} Selected
      </Typography>
      <Grid item container className={classes.buttons}>
        <Button onClick={onCancel} className={classes.cancel}>
          Cancel
        </Button>
        <Button onClick={onSave} variant="contained" color="primary">
          Done
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterFooter;
