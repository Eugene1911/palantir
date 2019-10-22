import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import { campaignCloneRequest } from './campaignCloneAction';
import useCloneCampaignReducer from './useCloneCampaignReducer';
import CampaignTableWrapperContext from '../../../CampaignTableWrapper/services/CampaignTableWrapperContext';

const campaignCloneMenuId = 'campaignCloneMenuId';
const CONFIRM_MESSAGE = 'Are you sure ?';

function useCloneMenuState(campaignId) {
  const { t } = useTranslation();
  const infoNotification = useHookInfoNotification();
  const {
    cloneCampaignState,
    cloneCampaignDispatch,
  } = useCloneCampaignReducer();
  const { addCloneToListHandler } = useContext(
    CampaignTableWrapperContext,
  );
  const [cloneMenuState, setCloneMenuState] = useState(null);
  const onClickCloneMenuHandler = (state, cloneType) => {
    const isConfirm = cloneType && window.confirm(CONFIRM_MESSAGE);
    setCloneMenuState(state);

    if (!isConfirm) return;

    campaignCloneRequest({
      cloneType,
      campaignId,
      addCloneToListHandler,
      cloneCampaignDispatch,
      infoNotification,
      t,
    });
  };

  return {
    cloneMenuState,
    cloneCampaignState,
    campaignCloneMenuId,
    onClickCloneMenuHandler,
  };
}

export default useCloneMenuState;
