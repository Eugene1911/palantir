import React from 'react';
import { inject, observer } from 'mobx-react';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { KEY_ENTER_CODE } from 'config/constants';
import { radioTitles } from '../../assets/constants/rightSidesConst';
import {
  adModels,
  // EBidType,
  EPriceType,
} from '../../assets/constants/commonPricingTypes';
import { TPricingModel } from '../../stores/PricingStore';
import * as S from './styles';

interface IPriceSelectorProps {
  pricing?: TPricingModel;
}

function PriceSelector(props?: IPriceSelectorProps): JSX.Element {
  const { pricing } = props;
  const {
    setPriceType,
    setBid,
    adModel,
    price: priceModel,
  } = pricing;
  const {
    priceType,
    bid,
    // bidType,
  } = priceModel;

  const isStandardChecked = priceType === EPriceType.STANDARD;
  const [bidValue, setBidValue] = React.useState<string>(bid);

  const handleBudgetChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setBidValue(event.target.value);
  };

  const onKeyPressHandler = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (!event || event.key === KEY_ENTER_CODE) {
      event?.preventDefault();

      setBid(bidValue);
    }
  };

  return (
    <>
      <Grid container justify="flex-start">
        <Grid item xs={3}>
          <TextField
            label={adModels[adModel]}
            type="number"
            value={bidValue}
            onChange={handleBudgetChange}
            onKeyPress={onKeyPressHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <S.RadioGroup>
            <S.RadioWrap>
              <Radio
                checked={isStandardChecked}
                color="primary"
                onChange={() => setPriceType(EPriceType.STANDARD)}
              />
              <Typography
                color={
                  isStandardChecked ? 'primary' : 'textSecondary'
                }
              >
                {radioTitles.standard}
              </Typography>
            </S.RadioWrap>
            <S.RadioWrap>
              <Radio
                checked={!isStandardChecked}
                color="primary"
                onChange={() => setPriceType(EPriceType.DYNAMIC)}
              />
              <Typography
                color={
                  !isStandardChecked ? 'primary' : 'textSecondary'
                }
              >
                {radioTitles.dynamic}
              </Typography>
            </S.RadioWrap>
          </S.RadioGroup>
        </Grid>
      </Grid>
    </>
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  pricing: CampaignAudienceAndPricingStore.pricing,
}))(observer(PriceSelector));
