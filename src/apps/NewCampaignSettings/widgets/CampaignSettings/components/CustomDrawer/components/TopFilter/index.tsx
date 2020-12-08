import React from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import useStyles from './useStyles';

interface ITopFilterProps {
  isShowAsyncLoadButton: boolean;
  topFilterTitle: string;
  setIsShowAsyncLoadButton: (checked: boolean) => void;
}

const TopFilter = ({
  isShowAsyncLoadButton,
  topFilterTitle,
  setIsShowAsyncLoadButton,
}: ITopFilterProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.topFilter}>
      <Grid
        justify="space-between"
        alignItems="center"
        container
        className={classes.filter}
      >
        <Grid item>
          <Typography className={classes.filterTitle}>
            {topFilterTitle}
          </Typography>
        </Grid>
        <Grid item>
          <Switch
            checked={isShowAsyncLoadButton}
            onChange={(evt): void =>
              setIsShowAsyncLoadButton(evt.target.checked)
            }
            name="filter"
            color="primary"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopFilter;
