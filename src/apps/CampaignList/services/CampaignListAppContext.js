import React, { createContext } from 'react';
import useCampaignListAppReducer from './useCampaignListAppReducer';

export const CampaignListAppContext = createContext();

export const CampaignListAppProvider = ({ children }) => {
  const campaignListAppState = useCampaignListAppReducer();

  return (
    <CampaignListAppContext.Provider value={campaignListAppState}>
      {children}
    </CampaignListAppContext.Provider>
  );
};
