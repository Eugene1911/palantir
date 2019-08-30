import { putCampaignStatus } from 'resources/api';
import APPROVE_REJECT_TYPE from './approveRejectTypeActions';

export function rejectCampaignAction({
  campaign,
  approveRejectDispath,
  updateItemToCampaignList,
}) {
  approveRejectDispath({
    type: APPROVE_REJECT_TYPE.SUCCESS,
    approvStatus: campaign.status,
  });
  updateItemToCampaignList(campaign);
}

export function requestChangeApproveStatus({
  id,
  approveStatus,
  approveRejectDispath,
  infoNotification,
  updateItemToCampaignList,
}) {
  putCampaignStatus(id, approveStatus)
    .then(({ data }) => {
      approveRejectDispath({
        type: APPROVE_REJECT_TYPE.SUCCESS,
        approvStatus: data.status,
      });
      updateItemToCampaignList(data);
      infoNotification({
        variant: 'success',
        message: `Campaign was changed status to ${approveStatus}`,
      });
    })
    .catch(({ response }) => {
      approveRejectDispath({
        type: APPROVE_REJECT_TYPE.FAILURE,
        payload: response.data,
      });

      infoNotification({
        variant: 'error',
        message: 'Something went wrong',
      });
    });
}
