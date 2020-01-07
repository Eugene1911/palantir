import React from 'react';
import PreloadUserCampaign from 'sharedWidgets/PreloadUserCampaign';
import AdvancedCustomStatisticsMain from './widgets/AdvancedCustomStatisticsMain';
import AdvancedCustomStatisticsStore from './stores/AdvancedCustomStatisticsStore';

function AdvancedCustomStatistics() {
  return (
    <PreloadUserCampaign
      ChildrenComonent={AdvancedCustomStatisticsMain}
      InitStore={AdvancedCustomStatisticsStore}
    />
  );
}

export default AdvancedCustomStatistics;
