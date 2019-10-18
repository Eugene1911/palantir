import AppList from 'apps/AppList';
import SignIn from 'apps/SignIn';
import CampaignListApp from 'apps/CampaignList/app';
import ToolsPage from 'apps/ToolsPage/app';

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
    exact: true,
  },
];

export default mainAppRoutes;
