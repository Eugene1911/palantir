import React from 'react';
import { inject, observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import { TFilterSideStore } from 'sharedWidgets/FilterSide/store/FilterSideStore';
import {
  addCustom,
  unavailableCustomSpots,
} from '../../assets/constants/rightSidesConst';
import * as S from './styles';

interface ICustomSpotPricesProps {
  isAvailable?: boolean;
  filterSide?: TFilterSideStore;
}

function CustomSpotPrices(
  props?: ICustomSpotPricesProps,
): JSX.Element {
  const { isAvailable, filterSide } = props;

  const handleClick = () => {
    filterSide.onToggleFilterHandler();
  };

  return isAvailable ? (
    <>
      <S.StyledButton color="primary" onClick={handleClick}>
        <AddIcon />
        <Typography>{addCustom}</Typography>
      </S.StyledButton>
    </>
  ) : (
    <Grid
      container
      spacing={1}
      justify="flex-start"
      alignItems="center"
    >
      <Grid item>
        <InfoIcon color="secondary" />
      </Grid>
      <Grid item>
        <Typography color="textSecondary">
          {unavailableCustomSpots}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => ({
  isAvailable: true,
  filterSide: CampaignAudienceAndPricingStore.pricing.filterSideStore,
}))(observer(CustomSpotPrices));
