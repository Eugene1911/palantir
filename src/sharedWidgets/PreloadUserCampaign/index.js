import React from 'react';
import SuspenseFallbackMain from 'sharedComponents/SuspenseFallbackMain';
import WrapperStartAppComponent from 'sharedComponents/WrapperStartAppComponent';
import usePreloadUserCampaign from './services/usePreloadUserCampaign';

function PreloadUserCampaign({
  ChildrenComonent,
  InitStore,
  moreStors,
}) {
  const { isLoading, campaign } = usePreloadUserCampaign();

  if (isLoading) {
    return <SuspenseFallbackMain />;
  }

  const store = {
    advancedCustomStatisticsStore: InitStore.create({
      campaign,
    }),
    ...moreStors,
  };

  return (
    <WrapperStartAppComponent store={store}>
      <ChildrenComonent />
    </WrapperStartAppComponent>
  );
}

export default PreloadUserCampaign;
