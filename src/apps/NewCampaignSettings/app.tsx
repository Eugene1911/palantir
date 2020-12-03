import React from 'react';
import { Route } from 'react-router-dom';
import WrapperStartAppComponent from 'sharedComponents/WrapperStartAppComponent';
import { SnackbarProvider } from 'notistack';
import { MAX_COUNT_SNACK } from '../../config/constants';
import CampaignSettings from './widgets/CampaignSettings';
import NewCampaignSettingsStore, {
  InitialNewCampaignSettingsStore,
} from './stores/NewCampaignSettingsStore';

const NewCampaignSettings = (): JSX.Element => {
  const store = {
    newCampaignSettings: NewCampaignSettingsStore.create(
      InitialNewCampaignSettingsStore,
    ),
  };

  return (
    <Route path="/new_create_campaign_settings/:mode?/:id?">
      <SnackbarProvider maxSnack={MAX_COUNT_SNACK}>
        <WrapperStartAppComponent store={store}>
          <CampaignSettings />
        </WrapperStartAppComponent>
      </SnackbarProvider>
    </Route>
  );
};

export default NewCampaignSettings;
