import React from 'react';
import { inject, observer } from 'mobx-react';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import { KEY_ENTER_CODE } from 'config/constants';
import QuestionTooltip from 'sharedComponents/QuestionTooltip';
import { Grid } from '@material-ui/core';
import {
  switchTitles,
  textFieldLabels,
  tooltips,
} from '../../assets/constants/rightSidesConst';
import * as S from './styles';

interface IBudgetSelectorProps {
  withTotal?: boolean;
  daily?: string;
  total?: string;
  toggleBudgetWithTotal?: () => void;
  setBudget?: (budget: string, isDaily: boolean) => void;
}

function BudgetSelector(props: IBudgetSelectorProps): JSX.Element {
  const {
    withTotal,
    daily,
    total,
    toggleBudgetWithTotal,
    setBudget,
  } = props;
  const [dailyBudget, setDailyBudget] = React.useState<string>(daily);
  const [totalBudget, setTotalBudget] = React.useState<string>(total);
  const [invalidDaily, setInvalidDaily] = React.useState<boolean>(
    false,
  );
  const [invalidTotal, setInvalidTotal] = React.useState<boolean>(
    false,
  );

  const handleBudgetChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isDaily: boolean,
  ): void => {
    if (isDaily) {
      invalidDaily && setInvalidDaily(false);
      setDailyBudget(event.target.value);
    } else {
      invalidTotal && setInvalidTotal(false);
      setTotalBudget(event.target.value);
    }
  };

  const onKeyPressHandler = (
    event: React.KeyboardEvent<HTMLDivElement>,
    isDaily: boolean,
  ): void => {
    if (!event || event.key === KEY_ENTER_CODE) {
      event?.preventDefault();

      const budget = isDaily ? dailyBudget : totalBudget;

      if (Number(budget)) {
        setBudget(budget, isDaily);
      } else if (isDaily) {
        setDailyBudget('');
        setInvalidDaily(true);
      } else {
        setTotalBudget('');
        setInvalidTotal(true);
      }
    }
  };

  return (
    <Grid container justify="flex-start">
      <Grid container item xs={3} alignItems="center">
        <Grid item>
          <FormControl>
            <InputLabel htmlFor="daily">
              {textFieldLabels.dailyBudget}
            </InputLabel>
            <Input
              id="daily"
              error={invalidDaily}
              value={dailyBudget}
              onChange={e => handleBudgetChange(e, true)}
              onKeyPress={e => onKeyPressHandler(e, true)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item>
          <QuestionTooltip title={tooltips.dailyBudget} />
        </Grid>
      </Grid>
      <Grid container item xs={6}>
        <Grid item xs={4}>
          <S.StyledFormControlLabel
            control={
              <Switch
                checked={withTotal}
                onChange={toggleBudgetWithTotal}
                color="primary"
              />
            }
            label={switchTitles.totalBudget}
            labelPlacement="start"
          />
        </Grid>
        {withTotal ? (
          <Grid container item xs={5} alignItems="center">
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="total">
                  {textFieldLabels.totalBudget}
                </InputLabel>
                <Input
                  id="total"
                  error={invalidTotal}
                  value={totalBudget}
                  onChange={e => handleBudgetChange(e, false)}
                  onKeyPress={e => onKeyPressHandler(e, false)}
                  startAdornment={
                    <InputAdornment position="start">
                      $
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item>
              <QuestionTooltip title={tooltips.totalBudget} />
            </Grid>
          </Grid>
        ) : null}{' '}
      </Grid>
    </Grid>
  );
}

export default inject(({ CampaignAudienceAndPricingStore }) => {
  const { pricing } = CampaignAudienceAndPricingStore;

  return {
    daily: pricing.budget.daily,
    total: pricing.budget.total,
    withTotal: pricing.budget.withTotal,
    toggleBudgetWithTotal: pricing.toggleBudgetWithTotal,
    setBudget: pricing.setBudget,
  };
})(observer(BudgetSelector));
