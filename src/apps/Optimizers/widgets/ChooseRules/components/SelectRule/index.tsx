import React from 'react';
import { observer } from 'mobx-react';
import find from 'lodash/find';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import useStores, { TOptimizersStors } from 'apps/Optimizers/store';
import useStyles from './useStyles';
import { TRuleGroupModel } from '../../../OptimizerCreate/widgets/OptimizerRule/store/RuleGroupModel';
import conditions from './assets/conditions';

type TSelectRuleProps = {
  rule: TRuleGroupModel;
};

function SelectRule({ rule }: TSelectRuleProps): JSX.Element {
  const { optimizerCreateStore }: TOptimizersStors = useStores();
  const {
    onSelectRuleHandler,
    selectRules,
  } = optimizerCreateStore.chooseRules;
  const classes = useStyles({});
  const condition = conditions[rule.condition];
  const isSelected = find(selectRules, { id: rule.id });

  return (
    <Grid justify="space-between" alignItems="center" container>
      <Grid item>
        <Checkbox
          onChange={(): void => onSelectRuleHandler(rule)}
          checked={!!isSelected}
          className={classes.checkbox}
        />
      </Grid>
      <Grid item>
        <span className={classes.condition}>if</span>
        <Typography component="span">{rule.variable}</Typography>
      </Grid>
      <Grid className={classes.oprator} xs item>
        <condition.icon className={classes.icon} />
        <Typography component="span">{condition.name}</Typography>
      </Grid>
      <Grid item>
        <Typography component="span">{rule.value}</Typography>
      </Grid>
    </Grid>
  );
}

export default observer(SelectRule);
