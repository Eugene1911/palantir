import { useState, useContext } from 'react';
import requestUser from './campaignFilterStateActions';
import { CampaignListAppContext } from '../../../../services/CampaignListAppContext';
import CAMPAIGN_LIST_TYPES_ACTIONS from '../../../../services/campaignListAppActionsType';

const initCampaignFilterState = {
  format_id: [],
  pricing_model: '',
  status: '',
  campaignId: '',
  email: '',
  flat_rate: '',
};

function useCampaignFilterState() {
  const { campaignListAppStateDispatch } = useContext(
    CampaignListAppContext,
  );
  const [campaignFilterState, setCampaignFilter] = useState(
    initCampaignFilterState,
  );
  const onChangeCampaignFilterFielsHandler = ({ target }) => {
    let { value } = target;
    const { name } = target;
    const isFormatId = name === 'format_id';
    const lastItem = isFormatId && value[value.length - 1];

    if (lastItem === null) {
      value = [];
    }

    setCampaignFilter({
      ...campaignFilterState,
      ...{
        [name]: value,
      },
    });
  };
  const onSubmitFilterHandler = async event => {
    event.preventDefault();
    const { campaignId, email } = campaignFilterState;
    const clearEmail = email.trim();
    const campaignIdNumnber = Number(campaignId);
    const type = campaignIdNumnber
      ? CAMPAIGN_LIST_TYPES_ACTIONS.REQUEST_CAMPAIGN_ID
      : CAMPAIGN_LIST_TYPES_ACTIONS.REQUEST_MAIN_FILTER;
    const payload = campaignIdNumnber
      ? { campaignId: campaignIdNumnber }
      : { ...campaignFilterState };

    if (clearEmail && !campaignId) {
      payload.user_id = await requestUser({ email: clearEmail });
    } else if (!clearEmail) {
      payload.user_id = null;
    }

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
