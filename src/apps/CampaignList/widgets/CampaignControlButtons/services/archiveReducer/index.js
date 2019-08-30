import { useReducer, useContext } from 'react';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import CampaignTableWrapperContext from 'apps/CampaignList/widgets/CampaignTableWrapper/services/CampaignTableWrapperContext';
import { archiveReducer, initArchiveReducer } from './archiveReducer';
import requestArchiveCampaign from './archiveActions';

const CONFIRM_MESSAGE = 'Are you sure ?';

function useArchiveReducer(status, id) {
  const { updateItemToCampaignList } = useContext(
    CampaignTableWrapperContext,
  );
  const infoNotification = useHookInfoNotification();
  const [archiveReducerState, archiveReducerDispatch] = useReducer(
    archiveReducer,
    initArchiveReducer,
  );
  const { isFetching } = archiveReducerState;
  const isDisabledArchiveButton = status === 'archived' || isFetching;
  const onChangeArchiveHandler = () => {
    const isConfirm = window.confirm(CONFIRM_MESSAGE);

    if (!isConfirm) return;

    requestArchiveCampaign({
      id,
      archiveReducerDispatch,
      infoNotification,
      updateItemToCampaignList,
    });
  };

  return {
    archiveReducerState,
    onChangeArchiveHandler,
    isDisabledArchiveButton,
  };
}

export default useArchiveReducer;
