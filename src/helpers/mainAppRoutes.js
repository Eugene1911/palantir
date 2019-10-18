/* eslint-disable import/no-cycle */
import ClientListingApp from 'apps/ClientListing/app';
import SignIn from 'apps/SignIn';
import CampaignListApp from 'apps/CampaignList/app';
import ToolsPage from 'apps/ToolsPage/app';
import AppList from 'apps/AppList';

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
    component: ToolsPage,
    path: '/ToolsPage',
  },
  {
    component: ClientListingApp,
    path: '/ClientListing',
    exact: true,
  },
];

export default mainAppRoutes;
