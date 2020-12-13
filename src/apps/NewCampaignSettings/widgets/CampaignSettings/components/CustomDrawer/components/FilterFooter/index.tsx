import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './useStyles';

interface IFilterFooterProps {
  selectedCount: number;
  onCancel?: () => void;
  onSave?: () => void;
  isShowSelectedCount?: boolean;
  saveText?: string;
  isSaveDisabled?: boolean;
  customLeftButton?: JSX.Element;
}

const FilterFooter = ({
  selectedCount,
  onCancel,
  onSave,
  isShowSelectedCount = true,
  saveText,
  isSaveDisabled = false,
  customLeftButton,
}: IFilterFooterProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.footer}
      container
      justify="space-between"
      alignItems="center"
    >
      {isShowSelectedCount && (
        <Typography color="primary">
          {selectedCount} Selected
        </Typography>
      )}
      {!!customLeftButton && customLeftButton}
      <Grid item container className={classes.buttons}>
        {onCancel && (
          <Button onClick={onCancel} className={classes.cancel}>
            Cancel
          </Button>
        )}
        {onSave && (
          <Button
            disabled={isSaveDisabled}
            onClick={onSave}
            variant="contained"
            color="primary"
          >
            {saveText || 'Done'}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default FilterFooter;
