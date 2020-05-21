import React from 'react';
import { withTranslation, useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Notifier from 'sharedWidgets/Notifier';
import ClientListingFilter from '../ClientListingFilter';
import ClientListingTable from '../ClientListingTable';

function ClientListingMain(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Paper>
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom>
          {t('client_listing:title')}
        </Typography>
        <Notifier />
        <ClientListingFilter />
      </CardContent>
      <ClientListingTable />
    </Paper>
  );
}

export default withTranslation(['client_listing'])(ClientListingMain);
