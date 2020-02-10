import React from 'react';
import PreloadUserCampaign from 'sharedWidgets/PreloadUserCampaign';
import FilterSideStore from 'sharedWidgets/FilterSide/store/FilterSideStore';
import AdvancedCustomStatisticsMain from './widgets/AdvancedCustomStatisticsMain';
import AdvancedCustomStatisticsStore from './stores/AdvancedCustomStatisticsStore';

function AdvancedCustomStatistics() {
  return (
    <PreloadUserCampaign
      ChildrenComonent={AdvancedCustomStatisticsMain}
      InitStore={AdvancedCustomStatisticsStore}
      moreStors={{
        filterSideStore: FilterSideStore.create({}),
      }}
    />
  );
}

export default AdvancedCustomStatistics;
