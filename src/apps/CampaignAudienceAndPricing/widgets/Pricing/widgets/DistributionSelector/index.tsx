import React from 'react';
import { inject, observer } from 'mobx-react';
import Radio from '@material-ui/core/Radio';
import { Typography } from '@material-ui/core';
import { radioTitles } from '../../assets/constants/rightSidesConst';
import { EDistribution } from '../../assets/constants/commonPricingTypes';
import * as S from './styles';

interface IDistributionSelectorProps {
  distribution?: EDistribution;
  setDistribution?: (distribution: EDistribution) => void;
}

function DistributionSelector(
  props: IDistributionSelectorProps,
): JSX.Element {
  const { distribution, setDistribution } = props;
  const isAsapChecked = distribution === EDistribution.ASAP;

  return (
    <>
      <S.RadioGroup>
        <S.RadioWrap>
          <Radio
            checked={isAsapChecked}
            color="primary"
            onChange={() => setDistribution(EDistribution.ASAP)}
          />
          <Typography
            color={isAsapChecked ? 'primary' : 'textSecondary'}
          >
            {radioTitles.asap}
          </Typography>
        </S.RadioWrap>
        <S.RadioWrap>
          <Radio
            checked={!isAsapChecked}
            color="primary"
            onChange={() => setDistribution(EDistribution.EVEN)}
          />
          <Typography
            color={!isAsapChecked ? 'primary' : 'textSecondary'}
          >
            {radioTitles.even}
          </Typography>
        </S.RadioWrap>
      </S.RadioGroup>
    </>
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  distribution: CampaignAudienceAndPricingStore.pricing.distribution,
  setDistribution:
    CampaignAudienceAndPricingStore.pricing.setDistribution,
}))(observer(DistributionSelector));
