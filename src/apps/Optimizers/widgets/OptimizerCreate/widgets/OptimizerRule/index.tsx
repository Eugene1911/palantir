import React from 'react';
import { observer } from 'mobx-react';
import { v4 as uuidv4 } from 'uuid';
import OptimizerRule from './rule';
import { TRuleGroupModel } from './store/RuleGroupModel';

type TOptimizerRuleWrapper = {
  rules: TRuleGroupModel[];
};

function OptimizerRuleWrapper({
  rules,
}: TOptimizerRuleWrapper): JSX.Element {
  const isLastRule: boolean = rules.length === 1;

  return (
    <div>
      {rules.map((rule, index) => (
        <OptimizerRule
          isLastRule={isLastRule}
          rule={rule}
          index={index}
          key={uuidv4()}
        />
      ))}
    </div>
  );
}

export default observer(OptimizerRuleWrapper);
