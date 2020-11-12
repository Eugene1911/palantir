import React from 'react';
import { inject, observer } from 'mobx-react';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import { radioTitles } from '../../assets/constants/rightSidesConst';
import * as S from './styles';

interface IRTBSelectorProps {
  rtb?: boolean;
  setRtb?: (rtb: boolean) => void;
}

function RTBSelector(props: IRTBSelectorProps): JSX.Element {
  const { rtb, setRtb } = props;

  return (
    <>
      <S.RadioGroup>
        <S.RadioWrap>
          <Radio
            checked={rtb}
            color="primary"
            onChange={() => setRtb(true)}
          />
          <Typography color={rtb ? 'primary' : 'textSecondary'}>
            {radioTitles.yes}
          </Typography>
        </S.RadioWrap>
        <S.RadioWrap>
          <Radio
            checked={!rtb}
            color="primary"
            onChange={() => setRtb(false)}
          />
          <Typography color={!rtb ? 'primary' : 'textSecondary'}>
            {radioTitles.no}
          </Typography>
        </S.RadioWrap>
      </S.RadioGroup>
    </>
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  rtb: CampaignAudienceAndPricingStore.audience.rtb,
  setRtb: CampaignAudienceAndPricingStore.audience.setRtb,
}))(observer(RTBSelector));
