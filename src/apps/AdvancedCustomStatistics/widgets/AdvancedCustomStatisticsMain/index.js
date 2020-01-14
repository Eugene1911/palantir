import React from 'react';
import { withTranslation, useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import AdvancedCustomStatisticsFilter from '../AdvancedCustomStatisticsFilter';
import AdvancedCustomStatisticsTable from '../AdvancedCustomStatisticsTable';
import AdvancedCustomStatisticsChart from '../AdvancedCustomStatisticsChart';

function AdvancedCustomStatisticsMain() {
  const { t } = useTranslation();

  return (
    <Paper>
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom>
          {t('advanced_custom_statistics:title')}
        </Typography>
        <br />
        <AdvancedCustomStatisticsFilter />
      </CardContent>
      <br />
      <AdvancedCustomStatisticsChart />
      <br />
      <AdvancedCustomStatisticsTable />
    </Paper>
  );
}

export default withTranslation(['advanced_custom_statistics'])(
  AdvancedCustomStatisticsMain,
);
