/* eslint-disable import/no-cycle */
import ClientListingApp from 'apps/ClientListing/app';
import SignIn from 'apps/SignIn';
import CampaignListApp from 'apps/CampaignList/app';
import CurrencyExchange from 'apps/CurrencyExchange/app';
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
    component: CurrencyExchange,
    path: '/CurrencyExchange',
  },
  {
    component: ClientListingApp,
    path: '/ClientListing',
    exact: true,
  },
];

export default mainAppRoutes;
