import React from 'react';
import { inject, observer } from 'mobx-react';

import { AllCustomStatus } from 'sharedTypes';
import { TSchedulingModel } from '../../stores/SchedulingStore';
import DayTimeSelectors from '../DayTimeSelectors';
import { dayTimeRangesByStatus } from '../../constants/dayTimeRanges';
import AllCustomRadio from '../../../../components/AllCustomRadio';

interface IDayTimeRangeProps {
  scheduling?: TSchedulingModel;
}

const DayTimeRange = ({
  scheduling,
}: IDayTimeRangeProps): JSX.Element => {
  const handleChange = (status: AllCustomStatus): void => {
    scheduling.setDayTimeRange(dayTimeRangesByStatus[status], status);
  };

  return (
    <>
      <AllCustomRadio
        onChange={handleChange}
        value={scheduling.dayTimeRangeStatus}
        name="dayTimeRange"
      />

      {scheduling.dayTimeRangeStatus === AllCustomStatus.CUSTOM && (
        <DayTimeSelectors />
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  scheduling: newCampaignSettings.scheduling,
}))(observer(DayTimeRange));
