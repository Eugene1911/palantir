import { flow, Instance, types } from 'mobx-state-tree';
import {
  AllCustomStatus,
  INotification,
  LoadingStatus,
} from 'sharedTypes';
import { getRetargetingList } from 'resources/api';
import { GLOBAL_NAME } from 'config/constants';

const RetargetingItemModel = types.model({
  id: types.number,
  name: types.string,
});

export const InitialRetargetingModel = {
  retargetingList: [],
  retargetingStatus: LoadingStatus.INITIAL,
  retargetingRadio: AllCustomStatus.ALL,
};

const RetargetingModel = types
  .model({
    retargeting: types.maybe(types.number),
    retargetingList: types.array(RetargetingItemModel),
    retargetingStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
    retargetingRadio: types.enumeration<AllCustomStatus>(
      Object.values(AllCustomStatus),
    ),
  })
  .actions(self => ({
    setRetargeting(id: number): void {
      self.retargeting = id;
    },
    setRadio(radio: AllCustomStatus): void {
      self.retargetingRadio = radio;
    },
    getRetargeting: flow(function* getRetargeting(
      infoNotification: (arg: INotification) => void,
    ) {
      self.retargetingStatus = LoadingStatus.LOADING;
      try {
        yield getRetargetingList(window[GLOBAL_NAME].user_id, {});

        self.retargetingStatus = LoadingStatus.SUCCESS;
      } catch (error) {
        self.retargetingStatus = LoadingStatus.ERROR;
        const message =
          error?.response?.data?.msg || 'Retargeting loading error';

        infoNotification({
          variant: 'error',
          message,
        });
      }
    }),
  }));

export type TRetargetingModel = Instance<typeof RetargetingModel>;

export default RetargetingModel;
