import React, { useEffect, useRef } from 'react';
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
  const toRef = useRef(null);

  useEffect(() => {
    if (
      modelPrice.from !== undefined &&
      modelPrice.to !== undefined &&
      modelPrice.from > modelPrice.to
    ) {
      modelPrice.setToValue(undefined);
      toRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelPrice.from]);

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
          inputRef={toRef}
        />
      </Grid>
    </Grid>
  );
};

export default inject(({ newCampaignSettings }) => ({
  modelPrice: newCampaignSettings.targeting.modelPrice,
}))(observer(ModelPrice));
