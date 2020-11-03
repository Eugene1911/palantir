import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { TSpecialModel } from '../../stores/SpecialStore';
import Radio3Group from '../Radio3Group';
import InputDeleteIcon from '../../../../components/InputDeleteIcon';
import {
  flatDealRadios,
  FlatDealValues,
} from '../../constants/radioValues';

import useStyles from './useStyles';

interface IFlatDealProps {
  special?: TSpecialModel;
}

const FlatDeal = ({ special }: IFlatDealProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Radio3Group field="flatDeal" radios={flatDealRadios} />
      {special.flatDeal !== FlatDealValues.NO && (
        <Grid className={classes.container} container>
          <Grid className={classes.textField} item xs={2}>
            <TextField
              value={
                special.flatRate === undefined ? '' : special.flatRate
              }
              onChange={special.setFlatRate}
              disabled={
                special.flatDeal === FlatDealValues.FLAT_IMPRESSIONS
              }
              label="Flat rate%"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputDeleteIcon
                    value={special.flatRate}
                    onClick={special.clearFlatRate}
                    visible={
                      special.flatDeal !==
                      FlatDealValues.FLAT_IMPRESSIONS
                    }
                  />
                ),
              }}
              inputProps={{ className: classes.input }} // eslint-disable-line react/jsx-no-duplicate-props
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={
                special.flatImpressions === undefined
                  ? ''
                  : special.flatImpressions
              }
              onChange={special.setFlatImpressions}
              disabled={special.flatDeal === FlatDealValues.FLAT_RATE}
              label="Flat impressions,daily"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputDeleteIcon
                    value={special.flatImpressions}
                    onClick={special.clearFlatImpressions}
                    visible={
                      special.flatDeal !== FlatDealValues.FLAT_RATE
                    }
                  />
                ),
              }}
              inputProps={{ className: classes.input }} // eslint-disable-line react/jsx-no-duplicate-props
              fullWidth
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  special: newCampaignSettings.special,
}))(observer(FlatDeal));
