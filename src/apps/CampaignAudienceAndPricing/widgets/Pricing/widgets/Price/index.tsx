import React from 'react';
import uuid from 'react-uuid';
import { inject, observer } from 'mobx-react';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { KEY_ENTER_CODE } from 'config/constants';
import {
  bidPriceButtons,
  radioTitles,
} from '../../assets/constants/rightSidesConst';
import {
  adModels,
  EBidStatus,
  EBidType,
  EPriceType,
} from '../../assets/constants/commonPricingTypes';
import BidTypeButton from '../../components/BidTypeButton';
import BidStatus from '../../components/BidStatus';
import { TPricingModel } from '../../stores/PricingStore';
import { EFetchStatus } from '../../../../assets/commonTypes';
import { ReactComponent as minBidIcon } from '../../assets/images/minBid.svg';
import { ReactComponent as targetBidIcon } from '../../assets/images/targetBid.svg';
import { ReactComponent as recommendedBidIcon } from '../../assets/images/reccomendedBid.svg';
import * as S from './styles';

interface IPriceSelectorProps {
  pricing?: TPricingModel;
}

function PriceSelector(props?: IPriceSelectorProps): JSX.Element {
  const { pricing } = props;
  const {
    setPriceType,
    setBidType,
    setBid,
    adModel,
    price: priceModel,
  } = pricing;
  const { priceType, bid, bidType, fetchStatus } = priceModel;

  const isFetching = fetchStatus !== EFetchStatus.SUCCESS;
  const isStandardChecked = priceType === EPriceType.STANDARD;
  const [bidValue, setBidValue] = React.useState<string>(bid);
  const [invalidBid, setInvalidBid] = React.useState<boolean>(false);

  const status = React.useMemo(() => {
    if (isFetching || !Number(bidValue)) {
      return undefined;
    }

    switch (true) {
      case bidValue >= priceModel[EBidType.RECOMMENDED]:
        return EBidStatus.OPTIMAL;
      case bidValue < priceModel[EBidType.RECOMMENDED] &&
        bidValue >= priceModel[EBidType.TARGET]:
        return EBidStatus.COVERED;
      case bidValue < priceModel[EBidType.TARGET] &&
        bidValue >= priceModel[EBidType.MINIMUM]:
        return EBidStatus.LOW;
      default:
        setInvalidBid(true);
        return EBidStatus.ERROR;
    }
  }, [bidValue, isFetching, priceModel]);

  React.useEffect(() => setBidValue(bid), [bid]);

  const handleBudgetChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    invalidBid && setInvalidBid(false);
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

  const bidTypeProps = [
    {
      isFetching,
      isFilledBackground: bidType === EBidType.MINIMUM,
      icon: minBidIcon,
      bid: priceModel[EBidType.MINIMUM],
      onApply: () => setBidType(EBidType.MINIMUM),
      ...bidPriceButtons[EBidType.MINIMUM],
    },
    {
      isFetching,
      isFilledBackground: bidType === EBidType.TARGET,
      icon: targetBidIcon,
      bid: priceModel[EBidType.TARGET],
      onApply: () => setBidType(EBidType.TARGET),
      ...bidPriceButtons[EBidType.TARGET],
    },
    {
      isFetching,
      isFilledBackground: bidType === EBidType.RECOMMENDED,
      icon: recommendedBidIcon,
      bid: priceModel[EBidType.RECOMMENDED],
      onApply: () => setBidType(EBidType.RECOMMENDED),
      ...bidPriceButtons[EBidType.RECOMMENDED],
    },
  ];

  return (
    <>
      <Grid container justify="flex-start">
        <Grid item xs={3}>
          <TextField
            label={adModels[adModel]}
            type="number"
            disabled={isFetching}
            value={bidValue}
            error={invalidBid}
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
      <Grid container direction="column" spacing={3} xs={8}>
        {status ? <BidStatus status={status} /> : <></>}
        <Grid container item justify="space-between">
          {bidTypeProps.map(buttonProps => {
            return (
              <Grid key={uuid()} item>
                <BidTypeButton {...buttonProps} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  pricing: CampaignAudienceAndPricingStore.pricing,
}))(observer(PriceSelector));
