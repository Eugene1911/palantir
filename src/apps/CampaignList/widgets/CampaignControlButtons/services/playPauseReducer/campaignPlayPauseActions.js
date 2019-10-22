import { putCampaignStatus } from 'resources/api';
import CAMPAIGN_PLAY_PAUSE_BUTTON_ACTIONS from './campaignPlayPauseTypesActions';

function campaignPlayPauseActions(
  dispatch,
  id,
  newStatus,
  infoNotification,
  updateItemToCampaignList,
  t,
) {
  dispatch({
    type: CAMPAIGN_PLAY_PAUSE_BUTTON_ACTIONS.BEGIN,
  });

  putCampaignStatus(id, newStatus)
    .then(({ data }) => {
      dispatch({
        type: CAMPAIGN_PLAY_PAUSE_BUTTON_ACTIONS.SUCCESS,
        payload: data,
        campaignStatus: data.status,
      });
      updateItemToCampaignList(data);
      infoNotification({
        variant: 'success',
        message: `${t(
          'campaign_list:control_button.campaign_was_changed_status_to',
        )} ${newStatus}`,
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: CAMPAIGN_PLAY_PAUSE_BUTTON_ACTIONS.FAILURE,
        payload: response.data,
      });

      infoNotification({
        variant: 'error',
        message: t('common:error.something_went_wrong'),
      });
    });
}

export default campaignPlayPauseActions;
