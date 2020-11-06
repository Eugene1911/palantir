import React from 'react';
import { inject, observer } from 'mobx-react';
import Radio from '@material-ui/core/Radio';
import { Typography } from '@material-ui/core';
import { TAudienceModel } from '../../stores/AudienceStore';
import { radioTitles } from '../../assets/constants/rightSidesConst';
import * as S from './styles';

interface IRTBSelectorProps {
  audience?: TAudienceModel;
}

function RTBSelector(props: IRTBSelectorProps): JSX.Element {
  const { audience } = props;
  const selected = audience.rtb;
  const onRadioChange = audience.setRtb;

  return (
    <>
      <S.RadioGroup>
        <S.RadioWrap>
          <Radio
            checked={selected}
            color="primary"
            onChange={() => onRadioChange(true)}
          />
          <Typography color={selected ? 'primary' : 'textSecondary'}>
            {radioTitles.yes}
          </Typography>
        </S.RadioWrap>
        <S.RadioWrap>
          <Radio
            checked={!selected}
            color="primary"
            onChange={() => onRadioChange(false)}
          />
          <Typography color={!selected ? 'primary' : 'textSecondary'}>
            {radioTitles.no}
          </Typography>
        </S.RadioWrap>
      </S.RadioGroup>
    </>
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  audience: CampaignAudienceAndPricingStore.audience,
}))(observer(RTBSelector));
