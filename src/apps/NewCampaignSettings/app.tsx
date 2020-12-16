import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
    <SnackbarProvider maxSnack={MAX_COUNT_SNACK}>
      <WrapperStartAppComponent store={store}>
        <Switch>
          <Route path=":mode?/:id?">
            <CampaignSettings />
          </Route>
        </Switch>
      </WrapperStartAppComponent>
    </SnackbarProvider>
  );
};

export default NewCampaignSettings;
