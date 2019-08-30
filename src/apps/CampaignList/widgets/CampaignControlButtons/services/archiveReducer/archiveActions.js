import { putCampaignArchive } from 'resources/api';
import ARCHIVE_TYPE from './archiveTypeActions';

function requestArchiveCampaign({
  id,
  archiveReducerDispatch,
  infoNotification,
  updateItemToCampaignList,
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
        message: 'Campaign was archived',
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
        message: 'Something went wrong',
      });
    });
}

export default requestArchiveCampaign;
