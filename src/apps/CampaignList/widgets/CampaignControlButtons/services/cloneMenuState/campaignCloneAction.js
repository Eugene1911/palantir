import { postCampaignClone, postCampaignSaveAs } from 'resources/api';
import CLONE_CAMPAIGN_TYPE from './cloneCampaignTypeActions';

export function campaignCloneAsRonRequest({
  campaignId,
  addCloneToListHandler,
  cloneCampaignDispatch,
  infoNotification,
  t,
}) {
  cloneCampaignDispatch({
    type: CLONE_CAMPAIGN_TYPE.BEGIN,
  });

  postCampaignClone(campaignId)
    .then(({ data }) => {
      cloneCampaignDispatch({
        type: CLONE_CAMPAIGN_TYPE.SUCCESS,
      });
      infoNotification({
        variant: 'success',
        message: t(
          'campaign_list:control_button.сampaign_was_be_cloned',
        ),
      });
      addCloneToListHandler(data);
    })
    .catch(() => {
      cloneCampaignDispatch({
        type: CLONE_CAMPAIGN_TYPE.FAILURE,
      });
      infoNotification({
        variant: 'error',
        message: t('common:error.something_went_wrong'),
      });
    });
}
export function campaignSaveAsRequest({
  campaignId,
  addCloneToListHandler,
  cloneCampaignDispatch,
  infoNotification,
  t,
}) {
  const defaultCloneParams = {
    disabled_applications: [],
    disabled_subids: [],
    enabled_applications: [],
    enabled_subids: [],
    exclude_spots: [],
    is_prime: true,
    spot_prices: false,
    spots: [],
  };

  cloneCampaignDispatch({
    type: CLONE_CAMPAIGN_TYPE.BEGIN,
  });

  postCampaignSaveAs(campaignId, defaultCloneParams)
    .then(({ data }) => {
      cloneCampaignDispatch({
        type: CLONE_CAMPAIGN_TYPE.SUCCESS,
      });

      addCloneToListHandler(data);
      infoNotification({
        variant: 'success',
        message: t(
          'campaign_list:control_button.campaign_was_be_cloned_as_prime',
        ),
      });
    })
    .catch(() => {
      cloneCampaignDispatch({
        type: CLONE_CAMPAIGN_TYPE.FAILURE,
      });
      infoNotification({
        variant: 'error',
        message: t('common:error.something_went_wrong'),
      });
    });
}

export function campaignCloneRequest({ cloneType, ...args }) {
  if (cloneType === 'clone') {
    campaignCloneAsRonRequest({ ...args });
  } else if (cloneType === 'save_as') {
    campaignSaveAsRequest({ ...args });
  }
}
