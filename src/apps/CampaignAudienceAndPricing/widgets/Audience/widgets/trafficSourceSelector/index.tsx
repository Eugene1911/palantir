import React from 'react';
import { inject, observer } from 'mobx-react';
import Radio from '@material-ui/core/Radio';
import { Typography } from '@material-ui/core';
import { TAudienceModel } from '../../stores/AudienceStore';
import { radioTitles } from '../../assets/constants/rightSidesConst';
import { ETrafficSource } from '../../assets/constants/commonAudienceTypes';
import * as S from './styles';

interface ITrafficSourceSelectorProps {
  audience?: TAudienceModel;
}

function TrafficSourceSelector(
  props: ITrafficSourceSelectorProps,
): JSX.Element {
  const { audience } = props;
  const selected = audience.trafficSource;
  const onRadioChange = audience.setTrafficSource;

  return (
    <>
      <S.RadioGroup>
        <S.RadioWrap>
          <Radio
            checked={selected === ETrafficSource.ALL}
            color="primary"
            onChange={() => onRadioChange(ETrafficSource.ALL)}
          />
          <Typography
            color={
              selected === ETrafficSource.ALL
                ? 'primary'
                : 'textSecondary'
            }
          >
            {radioTitles.all}
          </Typography>
        </S.RadioWrap>
        <S.RadioWrap>
          <Radio
            checked={selected === ETrafficSource.DIRECT_INVENTORY}
            color="primary"
            onChange={() =>
              onRadioChange(ETrafficSource.DIRECT_INVENTORY)
            }
          />
          <Typography
            color={
              selected === ETrafficSource.DIRECT_INVENTORY
                ? 'primary'
                : 'textSecondary'
            }
          >
            {radioTitles.directInventory}
          </Typography>
        </S.RadioWrap>
        <S.RadioWrap>
          <Radio
            checked={selected === ETrafficSource.PARTNER_NETWORKS}
            onChange={() =>
              onRadioChange(ETrafficSource.PARTNER_NETWORKS)
            }
          />
          <Typography
            color={
              selected === ETrafficSource.PARTNER_NETWORKS
                ? 'primary'
                : 'textSecondary'
            }
          >
            {radioTitles.partnerNetworks}
          </Typography>
        </S.RadioWrap>
      </S.RadioGroup>
    </>
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  audience: CampaignAudienceAndPricingStore.audience,
}))(observer(TrafficSourceSelector));
