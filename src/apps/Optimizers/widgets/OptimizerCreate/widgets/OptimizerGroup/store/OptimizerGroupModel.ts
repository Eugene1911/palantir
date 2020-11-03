/* eslint-disable @typescript-eslint/camelcase */
import { types, Instance } from 'mobx-state-tree';
import RuleGroupModel, {
  TRuleGroupModel,
  ruleGroupDefault,
} from '../../OptimizerRule/store/RuleGroupModel';

export const ActionGroupModel = types.model('ActionGroupModel', {
  content: types.optional(types.maybeNull(types.string), null),
  created_at: types.optional(types.maybeNull(types.string), null),
  description: types.optional(types.maybeNull(types.string), null),
  id: types.optional(types.maybeNull(types.number), null),
  name: types.string,
  status: types.string,
  updated_at: types.optional(types.maybeNull(types.string), null),
});

export type TActionGroupModel = Instance<typeof ActionGroupModel>;

export const defaultOptimizerGroup = {
  status: 'active',
  title: 'Group',
  description: 'Group 1',
};

const OptimizerGroupModel = types
  .model('OptimizerGroupModel', {
    actions: types.optional(types.array(ActionGroupModel), [
      {
        status: 'active',
        name: 'pause',
      },
    ]),
    created_at: types.optional(types.maybeNull(types.string), null),
    id: types.optional(types.maybeNull(types.number), null),
    rules: types.optional(types.array(RuleGroupModel), [
      ruleGroupDefault,
    ]),
    sources: types.optional(types.array(types.string), ['app']),
    status: types.optional(types.maybeNull(types.string), ''),
    description: types.optional(types.string, 'Name of group'),
    updated_at: types.optional(types.maybeNull(types.string), null),
  })
  .actions((self: any) => ({
    onChangeSource({
      target,
    }: React.ChangeEvent<{ value: string }>): void {
      const { value } = target;
      const { sources } = self;
      const hasSource = sources.includes(value);

      if (hasSource) {
        self.sources = sources.filter(
          (source: string): boolean => source !== value,
        );
      } else {
        self.sources.push(value);
      }
    },
    onDeleteRule(index: number): void {
      self.rules.splice(index, 1);
    },
    onAddRule(rule: TRuleGroupModel): void {
      self.rules.push(rule);
    },
    onAddRuleHandler(): void {
      const rule = { ...ruleGroupDefault };

      self.rules.push(rule);
    },
    onChangeTitleHandler({
      target,
    }: React.ChangeEvent<{ value: string }>): void {
      const { value } = target;

      self.description = value;
    },
  }));

export type TOptimizerGroupModel = Instance<
  typeof OptimizerGroupModel
>;

export default OptimizerGroupModel;
