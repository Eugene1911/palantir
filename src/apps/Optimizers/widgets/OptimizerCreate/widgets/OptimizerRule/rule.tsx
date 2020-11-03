import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useStores, { TOptimizersStors } from 'apps/Optimizers/store';
import { TCommonFetchingDataType } from 'sharedTypes';
import { optimizerRuleCondition } from './services/optimizerRuleRespources';
import useStyles from './useStyles';
import useOptimizerRule, {
  TUseOptimizerRule,
} from './services/useOptimizerRule';
import { TRuleGroupModel } from './store/RuleGroupModel';

type TOptimizerRule = {
  rule: TRuleGroupModel;
  isLastRule: boolean;
  index: number;
};

function OptimizerRule({
  rule,
  isLastRule,
  index,
}: TOptimizerRule): JSX.Element {
  const { t } = useTranslation();
  const { optimizerCreateStore }: TOptimizersStors = useStores();
  const { optimizerVariables } = optimizerCreateStore;
  const {
    isOpenCondition,
    onToggleConditionHandler,
  }: TUseOptimizerRule = useOptimizerRule();
  const isFirstRule = index === 0;
  const isEven = index % 2 === 0;
  const expressionText = isFirstRule ? 'if' : '&';
  const classes = useStyles({ isOpenCondition, isEven });

  return (
    <div className={classes.ruleWrap}>
      <Grid alignItems="center" spacing={5} container>
        <Grid item xs={2} sm={2} md={1}>
          <Typography className={classes.ruleText}>
            {expressionText}
          </Typography>
        </Grid>
        <Grid item xs={10} sm={4} md={3}>
          <Select
            onChange={rule.onChangeVariable}
            value={rule.variable}
            fullWidth
          >
            {optimizerVariables.unic_variables.map(
              ({ name, id }: TCommonFetchingDataType) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ),
            )}
          </Select>
        </Grid>
        <Grid
          className={classes.ruleCondition}
          item
          xs={12}
          sm={6}
          md={3}
        >
          <Select
            onOpen={onToggleConditionHandler}
            onClose={onToggleConditionHandler}
            open={isOpenCondition}
            onChange={rule.onChangeCondition}
            value={rule.condition}
            fullWidth
          >
            {optimizerRuleCondition.map(condition => (
              <MenuItem key={condition.id} value={condition.id}>
                <condition.symbol
                  className={classes.conditionSymbol}
                />
                {/* <Typography className={classes.symbol} component="span">
                {condition.symbol}
              </Typography> */}

                {condition.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={10} sm={10} md={3}>
          <TextField
            fullWidth
            type="number"
            onChange={rule.onChangeValue}
            value={rule.value}
            inputProps={{ min: 0, style: { textAlign: 'right' } }}
            placeholder={t('optimizers:create:value')}
          />
        </Grid>
        <Grid xs={2} item>
          {!isLastRule && (
            <div className={classes.deleteButton}>
              <IconButton
                size="small"
                onClick={(): void => rule.onDeleteRuleHandler(index)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(OptimizerRule);
