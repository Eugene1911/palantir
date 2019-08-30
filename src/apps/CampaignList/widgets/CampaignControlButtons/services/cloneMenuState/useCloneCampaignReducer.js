import { useReducer } from 'react';
import {
  cloneCampaignReducer,
  initCloneCampaignReducer,
} from './cloneCampaignReducer';

function useCloneCampaignReducer() {
  const [cloneCampaignState, cloneCampaignDispatch] = useReducer(
    cloneCampaignReducer,
    initCloneCampaignReducer,
  );

  return {
    cloneCampaignState,
    cloneCampaignDispatch,
  };
}

export default useCloneCampaignReducer;
