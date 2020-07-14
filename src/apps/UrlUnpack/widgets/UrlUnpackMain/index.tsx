import React from 'react';
import { withTranslation, useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import UrlUnpackForm from '../UrlUnpackForm';
import UrlUnpackInfo from '../UrlUnpackInfo';

function UrlUnpackMain(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Paper>
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom>
          {t('url_unpack:title')}
        </Typography>
        <br />
        <UrlUnpackForm />
        <br />
        <UrlUnpackInfo />
      </CardContent>
    </Paper>
  );
}

export default withTranslation(['url_unpack'])(UrlUnpackMain);
