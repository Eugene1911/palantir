import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { useTranslation } from 'react-i18next';
// import DividerVertical from 'sharedComponents/DividerVertical';
import OptimizersTableWrapper from './widgets/OptimizersTableWrapper';

function OptimizersList(): JSX.Element {
  const { path } = useRouteMatch();
  const { t } = useTranslation('optimizers');

  return (
    <Paper>
      <CardContent>
        <Grid
          justify="space-between"
          alignItems="flex-end"
          container
          spacing={2}
        >
          <Grid item>
            <Typography variant="h5" component="h3" gutterBottom>
              {t('optimizers:list:title')}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              {/* <Button color="primary">Archived</Button>
              <DividerVertical style={{ margin: '5px 15px' }} /> */}
              <Button
                component={Link}
                to={`${path}/create`}
                variant="contained"
                color="primary"
              >
                {t('optimizers:list:new_optimizer')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <OptimizersTableWrapper />
    </Paper>
  );
}

export default OptimizersList;
