import { putCampaignArchive } from 'resources/api';
import ARCHIVE_TYPE from './archiveTypeActions';

function requestArchiveCampaign({
  id,
  archiveReducerDispatch,
  infoNotification,
  updateItemToCampaignList,
  t,
}) {
  archiveReducerDispatch({
    type: ARCHIVE_TYPE.BEGIN,
  });

  putCampaignArchive({
    campaign_ids: [id],
  })
    .then(response => {
      archiveReducerDispatch({
        type: ARCHIVE_TYPE.SUCCESS,
        payload: response,
      });
      infoNotification({
        variant: 'success',
        message: t(
          'campaign_list:control_button.campaign_was_archived',
        ),
      });
      updateItemToCampaignList({
        id,
        status: 'archived',
      });
    })
    .catch(error => {
      archiveReducerDispatch({
        type: ARCHIVE_TYPE.FAILURE,
        error,
      });

      infoNotification({
        variant: 'error',
        message: t('common:error.something_went_wrong'),
      });
    });
}

export default requestArchiveCampaign;
