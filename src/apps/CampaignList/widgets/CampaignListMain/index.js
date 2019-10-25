import React from 'react';
import { withTranslation, useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CampaignFilter from '../CampaignFilter';
import CampaignTableWrapper from '../CampaignTableWrapper';

function CampaignListMain() {
  const { t } = useTranslation();

  return (
    <>
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom>
          {t('campaign_list:title')}
        </Typography>
        <CampaignFilter />
      </CardContent>

      <CampaignTableWrapper />
    </>
  );
}

export default withTranslation(['campaign_list'])(CampaignListMain);
