/* eslint-disable import/no-cycle */
import ClientListingApp from 'apps/ClientListing/app';
import SignIn from 'apps/SignIn';
import CampaignListApp from 'apps/CampaignList/app';
import BackofficeTools from 'apps/BackofficeTools/app';
import AdvancedCustomStatistics from 'apps/AdvancedCustomStatistics/app';
import CampaignEdit from 'apps/CampaignEdit/app';
import AppList from 'apps/AppList';
import CampaignAudienceAndPricing from 'apps/CampaignAudienceAndPricing/app';
import NewCampaignSettings from 'apps/NewCampaignSettings/app';
import OptimizersApp from 'apps/Optimizers/app';

const mainAppRoutes = [
  {
    component: SignIn,
    path: '/',
    exact: true,
  },
  {
    component: AppList,
    path: '/AppList',
    exact: true,
  },
  {
    component: CampaignListApp,
    path: '/CampaignList',
    exact: true,
  },
  {
    component: BackofficeTools,
    path: '/BackofficeTools',
  },
  {
    component: ClientListingApp,
    path: '/ClientListing',
    exact: true,
  },
  {
    component: AdvancedCustomStatistics,
    path: '/AdvancedCustomStatistics',
    exact: true,
  },
  {
    component: CampaignEdit,
    path: '/CampaignEdit',
    exact: true,
  },
  {
    component: CampaignAudienceAndPricing,
    appListPath: '/CampaignAudienceAndPricing',
    path: '/CampaignAudienceAndPricing/:mode?/:id?',
    exact: true,
  },
  {
    component: NewCampaignSettings,
    appListPath: '/new_create_campaign_settings',
    path: '/new_create_campaign_settings/:mode?/:id?',
  },
  {
    component: OptimizersApp,
    path: '/Optimizers',
  },
];

export default mainAppRoutes;
