import { useReducer, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import CampaignTableWrapperContext from 'apps/CampaignList/widgets/CampaignTableWrapper/services/CampaignTableWrapperContext';
import {
  approveRejectReducer,
  initApproveRejectReducer,
} from './approveRejectReducer';
import {
  rejectCampaignAction,
  requestChangeApproveStatus,
} from './approveRejectActions';

function useApproveRejectReducer(
  approved,
  id,
  setDialogRejectReasosnsState,
) {
  const { t } = useTranslation();
  const { updateItemToCampaignList } = useContext(
    CampaignTableWrapperContext,
  );
  const infoNotification = useHookInfoNotification();
  const [approveRejectState, approveRejectDispath] = useReducer(
    approveRejectReducer,
    {
      ...initApproveRejectReducer,
      approvStatus: approved,
    },
  );
  const { approvStatus } = approveRejectState;
  const nextApproveStatus =
    approvStatus === 'rejected' ? 'approve' : 'rejected';
  const onHandlerRejectCampaign = campaign => {
    rejectCampaignAction({
      campaign,
      approveRejectDispath,
      updateItemToCampaignList,
    });
  };
  const onChangeApproveStatusHandler = () => {
    if (nextApproveStatus === 'rejected') {
      setDialogRejectReasosnsState(true);
    } else {
      requestChangeApproveStatus({
        id,
        approveStatus: nextApproveStatus,
        approveRejectDispath,
        infoNotification,
        updateItemToCampaignList,
        t,
      });
    }
  };

  return {
    nextApproveStatus,
    approveRejectState,
    approveRejectDispath,
    onHandlerRejectCampaign,
    onChangeApproveStatusHandler,
  };
}

export default useApproveRejectReducer;
