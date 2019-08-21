import { useState, useContext } from 'react';
import { CampaignListAppContext } from '../../../../services/CampaignListAppContext';

const initCampaignFilterState = {
  format_id: '',
  pricing_model: '',
  status: '',
  campaignId: '',
};

function useCampaignFilterState() {
  const { campaignListAppStateDispatch } = useContext(
    CampaignListAppContext,
  );
  const [campaignFilterState, setCampaignFilter] = useState(
    initCampaignFilterState,
  );
  const onChangeCampaignFilterFielsHandler = ({ target }) => {
    const { value, name } = target;

    setCampaignFilter({
      ...campaignFilterState,
      ...{
        [name]: value,
      },
    });
  };
  const onSubmitFilterHandler = event => {
    event.preventDefault();
    const campaignId = Number(campaignFilterState.campaignId);
    const type = campaignId
      ? 'CAMPAIGN_LIST_TYPES_ACTIONS/REQUEST_CAMPAIGN_ID'
      : 'CAMPAIGN_LIST_TYPES_ACTIONS/REQUEST_MAIN_FILTER';
    const payload = campaignId ? { campaignId } : campaignFilterState;

    campaignListAppStateDispatch({
      type,
      payload,
    });
  };

  return {
    campaignFilterState,
    onSubmitFilterHandler,
    onChangeCampaignFilterFielsHandler,
  };
}

export default useCampaignFilterState;
