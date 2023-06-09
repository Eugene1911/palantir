import React from 'react';
import { Block } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

const NO_DATA_TITLE = 'NO DATA';

type NoDataProps = {
  title?: string;
};

function NoData({ title = NO_DATA_TITLE }: NoDataProps): JSX.Element {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <Block fontSize="large" />
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
    </div>
  );
}

export default NoData;
