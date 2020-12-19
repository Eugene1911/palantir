import React from 'react';
import { Route } from 'react-router-dom';
import WrapperStartAppComponent from 'sharedComponents/WrapperStartAppComponent';
import { SnackbarProvider } from 'notistack';
import CampaignFormHeaderStore, {
  InitialCampaignFormHeaderStore,
} from 'sharedWidgets/CampaignFormHeader/stores/CampaignFormHeaderStore';
import { MAX_COUNT_SNACK } from '../../config/constants';
import CampaignSettings from './widgets/CampaignSettings';
import NewCampaignSettingsStore, {
  InitialNewCampaignSettingsStore,
} from './stores/NewCampaignSettingsStore';
import PAGE_PATH from '../../helpers/pagePath';

const NewCampaignSettings = (): JSX.Element => {
  const store = {
    newCampaignSettings: NewCampaignSettingsStore.create(
      InitialNewCampaignSettingsStore,
    ),
    campaignFormHeader: CampaignFormHeaderStore.create(
      InitialCampaignFormHeaderStore,
    ),
  };

  return (
    <Route path={`${PAGE_PATH.CAMPAIGN_SETTINGS}/:mode?/:id?`}>
      <SnackbarProvider maxSnack={MAX_COUNT_SNACK}>
        <WrapperStartAppComponent store={store}>
          <CampaignSettings />
        </WrapperStartAppComponent>
      </SnackbarProvider>
    </Route>
  );
};

export default NewCampaignSettings;
