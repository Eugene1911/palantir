import { flow, Instance, types } from 'mobx-state-tree';
import { INotification, LoadingStatus } from 'sharedTypes';
import { getFormats } from 'resources/api';

const AdFormatModelType = types.model({
  id: types.number,
  name: types.string,
  width: types.optional(types.number, 0),
  height: types.optional(types.number, 0),
  type: types.string,
  hidden: types.boolean,
});

export const InitialAdFormatModel = {
  adFormatList: [],
  adFormatListStatus: LoadingStatus.INITIAL,
};

const AdFormatModel = types
  .model({
    adFormat: types.maybe(types.number),
    adFormatList: types.array(AdFormatModelType),
    adFormatListStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
  })
  .actions(self => ({
    setAdFormat(adFormat: number): void {
      self.adFormat = adFormat;
    },
    getAdFormatList: flow(function* getAdFormatList(
      infoNotification: (arg: INotification) => void,
    ) {
      self.adFormatListStatus = LoadingStatus.LOADING;
      try {
        const { data } = yield getFormats({});
        self.adFormatListStatus = LoadingStatus.SUCCESS;
        self.adFormatList = data;
      } catch (error) {
        self.adFormatListStatus = LoadingStatus.ERROR;

        infoNotification({
          variant: 'error',
          message: 'Ad Formats loading error',
        });
      }
    }),
  }));

export type TAdFormatModel = Instance<typeof AdFormatModel>;

export default AdFormatModel;
