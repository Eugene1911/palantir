import React, { useEffect } from 'react';
import WrapperStartAppComponent from 'sharedComponents/WrapperStartAppComponent';
import CampaignStepper from 'sharedComponents/CampaignStepper';
import { SnackbarProvider } from 'notistack';
import { MAX_COUNT_SNACK } from 'config/constants';
import { useParams, Route } from 'react-router-dom';
import Audience from './widgets/Audience';
import Pricing from './widgets/Pricing';
import SaveStepAction from './widgets/SaveStepActions';
import CampaignAudienceAndPricingStore, {
  InitialCampaignAudienceAndPricingStore,
} from './stores/CampaignAudienceAndPricingStore';
import { getCampaignById } from '../../resources/api';
import { EUrlMode } from './assets/commonTypes';
import PAGE_PATH from '../../helpers/pagePath';

const store = {
  CampaignAudienceAndPricingStore: CampaignAudienceAndPricingStore.create(
    InitialCampaignAudienceAndPricingStore,
  ),
};

export interface IUrlParamsType {
  mode: EUrlMode;
  id: string;
}

function CampaignAudienceAndPricing(): JSX.Element {
  const [campaign, setCampaign] = React.useState();
  const params = useParams<IUrlParamsType>();
  const { mode, id } = params;

  const getCampaign = async () => {
    const { data } = await getCampaignById(Number(id));
    setCampaign(data);
  };

  useEffect(() => {
    mode === EUrlMode.EDIT && id && getCampaign();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Route
      path={`${PAGE_PATH.CAMPAIGN_AUDIENCE_AND_PRICING}/:mode?/:id?`}
    >
      <SnackbarProvider maxSnack={MAX_COUNT_SNACK}>
        <WrapperStartAppComponent store={store}>
          <CampaignStepper activeStep={1} />
          <Audience initialCampaignData={campaign} />
          <Pricing initialCampaignData={campaign} />
          <SaveStepAction id={Number(id)} />
        </WrapperStartAppComponent>
      </SnackbarProvider>
    </Route>
  );
}

export default CampaignAudienceAndPricing;
