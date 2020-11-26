import { flow, Instance, types } from 'mobx-state-tree';
import { INotification, LoadingStatus } from 'sharedTypes';
import { getFormats } from 'resources/api';
import { TPermissionsStore } from '../../../../stores/PermissionsStore';
import { permissionsForAdFormats } from '../../constants/permissionsForAdFormats';

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
  .views(self => ({
    getAdFormatName(adFormat: number): string | undefined {
      return self.adFormatList.find(item => item.id === adFormat)
        ?.name;
    },
  }))
  .actions(self => ({
    setAdFormat(
      adFormat: number,
      callback: (name: string) => void,
    ): void {
      self.adFormat = adFormat;
      callback(self.getAdFormatName(adFormat));
    },
    getAdFormatList: flow(function* getAdFormatList(
      infoNotification: (arg: INotification) => void,
      permissions: TPermissionsStore,
    ) {
      self.adFormatListStatus = LoadingStatus.LOADING;
      try {
        const { data } = yield getFormats({});
        self.adFormatListStatus = LoadingStatus.SUCCESS;
        self.adFormatList = data.filter(
          item =>
            !item.hidden &&
            (!permissionsForAdFormats[item.name] ||
              permissions[permissionsForAdFormats[item.name]]),
        );
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
