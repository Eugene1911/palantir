import React from 'react';
import { inject, observer } from 'mobx-react';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import { KEY_ENTER_CODE } from 'config/constants';
import {
  switchTitles,
  textFieldLabels,
} from '../../assets/constants/rightSidesConst';
import * as S from './styles';

interface IRTBSelectorProps {
  rtbCustom?: boolean;
  rtbPrice?: string;
  toggleRtbCustom?: () => void;
  setRtbPrice?: (price: string) => void;
}

function RTBSelector(props: IRTBSelectorProps): JSX.Element {
  const { rtbCustom, rtbPrice, toggleRtbCustom, setRtbPrice } = props;
  const [price, setPrice] = React.useState<string>(rtbPrice);
  const [invalidPrice, setInvalidPrice] = React.useState<boolean>(
    false,
  );

  const handlePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    invalidPrice && setInvalidPrice(false);
    setPrice(event.target.value);
  };

  const onKeyPressHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (!event || event.key === KEY_ENTER_CODE) {
      event?.preventDefault();

      if (Number(price)) {
        setRtbPrice(price);
      } else {
        setPrice('');
        setInvalidPrice(true);
      }
    }
  };

  return (
    <S.Wrapper>
      <Box>
        <S.StyledFormControlLabel
          control={
            <Switch
              checked={rtbCustom}
              onChange={toggleRtbCustom}
              color="primary"
            />
          }
          label={switchTitles.custom}
          labelPlacement="start"
        />
      </Box>
      {rtbCustom ? (
        <Box>
          <FormControl>
            <InputLabel htmlFor="price">
              {textFieldLabels.rtb}
            </InputLabel>
            <Input
              id="price"
              error={invalidPrice}
              value={price}
              onChange={handlePriceChange}
              onKeyPress={onKeyPressHandler}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </Box>
      ) : null}
    </S.Wrapper>
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => {
  const { pricing } = CampaignAudienceAndPricingStore;

  return {
    rtbCustom: pricing.rtb.custom,
    rtbPrice: pricing.rtb.price,
    toggleRtbCustom: pricing.toggleRtbCustom,
    setRtbPrice: pricing.setRtbPrice,
  };
})(observer(RTBSelector));
