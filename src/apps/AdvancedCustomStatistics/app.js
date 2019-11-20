import React from 'react';
import WrapperStartAppComponent from 'sharedComponents/WrapperStartAppComponent';
import AdvancedCustomStatisticsMain from './widgets/AdvancedCustomStatisticsMain';

import AdvancedCustomStatisticsStore from './stores/AdvancedCustomStatisticsStore';
import AdvancedCustomStatisticsFilterStore from './widgets/AdvancedCustomStatisticsFilter/store/AdvancedCustomStatisticsFilterStore';

const store = {
  advancedCustomStatisticsFilterStore: AdvancedCustomStatisticsFilterStore.create(),
  advancedCustomStatisticsStore: AdvancedCustomStatisticsStore.create(),
};

function AdvancedCustomStatistics() {
  return (
    <WrapperStartAppComponent store={store}>
      <AdvancedCustomStatisticsMain />
    </WrapperStartAppComponent>
  );
}

export default AdvancedCustomStatistics;
