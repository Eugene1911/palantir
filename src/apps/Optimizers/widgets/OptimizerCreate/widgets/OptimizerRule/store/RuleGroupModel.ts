/* eslint-disable @typescript-eslint/camelcase */
import { types, Instance, getParent } from 'mobx-state-tree';

export const ruleGroupDefault = {
  condition: '<',
  status: 'active',
  type: 'simple',
  value: '1000',
  variable: 'clicks',
};

const RuleGroupModel = types
  .model('RuleGroupModel', {
    condition: types.string,
    created_at: types.optional(types.maybeNull(types.string), null),
    id: types.optional(types.maybeNull(types.number), null),
    order_index: types.optional(types.maybeNull(types.number), null),
    status: types.string,
    type: types.string,
    updated_at: types.optional(types.maybeNull(types.string), null),
    value: types.string,
    variable: types.string,
  })
  .actions((self: any) => ({
    onChangeCondition({
      target,
    }: React.ChangeEvent<{ name?: string; value: unknown }>): void {
      const { value } = target;
      self.condition = value;
    },
    onChangeVariable({
      target,
    }: React.ChangeEvent<{ name?: string; value: unknown }>): void {
      const { value } = target;
      console.log('value ->', value);
      self.variable = value;
    },
    onChangeValue({
      target,
    }: React.ChangeEvent<{ name?: string; value: unknown }>): void {
      const { value } = target;
      self.value = value;
    },
    onDeleteRuleHandler(index: number): void {
      const parent: any = getParent(self, 2);

      parent.onDeleteRule(index);
    },
  }));

export type TRuleGroupModel = Instance<typeof RuleGroupModel>;

export default RuleGroupModel;
