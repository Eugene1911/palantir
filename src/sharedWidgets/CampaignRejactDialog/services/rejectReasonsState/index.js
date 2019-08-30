import { useState, useEffect } from 'react';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';

const OTHER_ITEM_ID = 8;

const initStateRejectReasons = {
  reason: [],
  comment: '',
};
function useRejectReasonsState(
  rejectReasonsStore,
  campaignId,
  onClose,
  onHandlerRejectCampaign,
) {
  const infoNotification = useHookInfoNotification();
  const [rejectReasonsState, setRejectReasonsState] = useState(
    initStateRejectReasons,
  );
  const {
    loadRejectReasonsList,
    setCampaignDisapprove,
  } = rejectReasonsStore;
  const onCheckboxChangeHandler = id => {
    const currentReason = rejectReasonsState.reason.slice();
    const indexState = currentReason.indexOf(id);

    if (indexState === -1) {
      currentReason.push(id);
    } else {
      currentReason.splice(indexState, 1);
    }

    setRejectReasonsState({
      ...rejectReasonsState,
      reason: currentReason,
    });
  };
  const onCommentTypeHandler = ({ target }) => {
    const { value } = target;
    setRejectReasonsState({
      ...rejectReasonsState,
      comment: value,
    });
  };
  const onSaveReasonsHandler = () => {
    setCampaignDisapprove(
      campaignId,
      rejectReasonsState,
      onClose,
      infoNotification,
      onHandlerRejectCampaign,
    );
  };
  const isOtherSelected = rejectReasonsState.reason.includes(
    OTHER_ITEM_ID,
  );

  useEffect(() => {
    loadRejectReasonsList();
  }, [loadRejectReasonsList]);

  return {
    ...rejectReasonsStore,
    isOtherSelected,
    onCheckboxChangeHandler,
    onSaveReasonsHandler,
    onCommentTypeHandler,
  };
}

export default useRejectReasonsState;
