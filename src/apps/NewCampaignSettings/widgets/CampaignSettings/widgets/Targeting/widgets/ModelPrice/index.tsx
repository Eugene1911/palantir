import React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import { ONLY_INTEGER_INPUT_PATTERN } from 'config/constants';
import TextField from '@material-ui/core/TextField';
import { TModelPriceModel } from '../../stores/models/ModelPrice';
import useStyles from './useStyles';

interface IModelPriceProps {
  modelPrice?: TModelPriceModel;
}

const ModelPrice = ({
  modelPrice,
}: IModelPriceProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid className={classes.textField} item xs={2}>
        <TextField
          value={modelPrice.from === undefined ? '' : modelPrice.from}
          onChange={modelPrice.setFrom}
          placeholder="Any"
          label="From, $"
          inputProps={{
            className: classes.input,
            pattern: ONLY_INTEGER_INPUT_PATTERN,
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          value={modelPrice.to === undefined ? '' : modelPrice.to}
          onChange={modelPrice.setTo}
          placeholder="Any"
          label="To, $"
          inputProps={{
            className: classes.input,
            pattern: ONLY_INTEGER_INPUT_PATTERN,
          }}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default inject(({ newCampaignSettings }) => ({
  modelPrice: newCampaignSettings.targeting.modelPrice,
}))(observer(ModelPrice));
