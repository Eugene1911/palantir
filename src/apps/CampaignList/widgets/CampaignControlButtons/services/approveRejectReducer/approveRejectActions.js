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
  t,
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
        message: `${t(
          'campaign_list:control_button:campaign_was_changed_status_to',
        )} ${approveStatus}`,
      });
    })
    .catch(({ response }) => {
      approveRejectDispath({
        type: APPROVE_REJECT_TYPE.FAILURE,
        payload: response.data,
      });

      infoNotification({
        variant: 'error',
        message: t('common:error.something_went_wrong'),
      });
    });
}
