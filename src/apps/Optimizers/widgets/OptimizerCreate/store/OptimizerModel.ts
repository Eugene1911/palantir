/* eslint-disable @typescript-eslint/camelcase */
import { types, flow, Instance, getParent } from 'mobx-state-tree';
import { postOptimizer, putOptimizer } from 'resources/api';
import { notiferActionOk } from 'sharedComponents/NotiferActionOk';
import { NOTIFIER_DEFAULT_OPTIONS } from 'config/constants';
import OptimizerGroupModel, {
  defaultOptimizerGroup,
} from '../widgets/OptimizerGroup/store/OptimizerGroupModel';

const OptimizerModel = types
  .model('OptimizerModel', {
    id: types.optional(types.maybeNull(types.number), null),
    user_id: types.optional(types.maybeNull(types.number), null),
    external_id: types.optional(types.maybeNull(types.number), null),
    status: types.string,
    title: types.optional(types.maybeNull(types.string), ''),
    description: types.optional(types.maybeNull(types.string), null),
    default_time_interval: types.string,
    rule_count: types.number,
    rule_group_count: types.number,
    action_count: types.optional(types.maybeNull(types.number), null),
    campaign_count: types.optional(
      types.maybeNull(types.number),
      null,
    ),
    created_at: types.optional(types.maybeNull(types.string), null),
    updated_at: types.optional(types.maybeNull(types.string), null),
    linked_at: types.optional(types.maybeNull(types.string), null),
    rule_groups: types.optional(types.array(OptimizerGroupModel), [
      defaultOptimizerGroup,
    ]),
  })
  .actions((self: any) => ({
    saveOptimazer: flow(function* saveOptimazerResources() {
      self.isLoading = true;
      try {
        const { data } = yield postOptimizer(self);
        const { response } = data;

        self.optimizer = response;

        self.isLoading = false;
        self.showNotifier('Optimazer was created');
        self.backPage();
      } catch (error) {
        self.getErrorMessage(error);
        self.isLoading = false;
        console.error('Failed to fetch projects', error);
      }
    }),
    editOptimazer: flow(function* editOptimazerResources() {
      self.isLoading = true;
      try {
        const optimizerId = self.id;
        const { data } = yield putOptimizer(optimizerId, self);
        const { response } = data;

        self.optimizer = response;

        self.isLoading = false;
        self.showNotifier('Optimazer was updated');
        self.backPage();
      } catch (error) {
        self.getErrorMessage(error);
        self.isLoading = false;
        console.error('Failed to fetch projects', error);
      }
    }),
    getErrorMessage(error: any): void {
      const { response } = error;

      if (response) {
        const { data } = response;
        const msg = data.msg || '';

        self.showNotifier(msg, 'error');
      }
    },
    backPage(): void {
      const parent: any = getParent(self);
      parent.router.goBack();
    },
    showNotifier(message: string, variant: string): void {
      const parent: any = getParent(self);

      if (parent.notifier) {
        parent.notifier.pushSnackbar({
          message,
          options: {
            ...NOTIFIER_DEFAULT_OPTIONS,
            variant: variant || 'success',
            action: notiferActionOk,
          },
        });
      }
    },
    onSaveOptimizerHandler(): void {
      const isEdit = self.id;

      if (isEdit) {
        self.editOptimazer();
      } else {
        self.saveOptimazer();
      }
    },
    onEditTitleHandler({
      target,
    }: React.ChangeEvent<{ value: string }>): void {
      const { value } = target;
      self.title = value;
    },
    onPeriodChangeHandler({
      target,
    }: React.ChangeEvent<{ name?: string; value: unknown }>): void {
      const { value } = target;
      self.default_time_interval = value;
    },
  }));

export type TOptimizerModel = Instance<typeof OptimizerModel>;

export default OptimizerModel;
