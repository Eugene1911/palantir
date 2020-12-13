import { flow, Instance, types } from 'mobx-state-tree';
import { INotification, LoadingStatus } from 'sharedTypes';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
import { getFormats } from 'resources/api';
import { TPermissionsStore } from '../../../../stores/PermissionsStore';
import { permissionsForAdFormats } from '../../constants/permissionsForAdFormats';

const AdFormatModelType = types.model({
  id: types.number,
  name: types.string,
  width: types.optional(types.number, 0),
  height: types.optional(types.number, 0),
  type: types.string,
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
    get getAdFormatName(): string | undefined {
      return self.adFormatList.find(item => item.id === self.adFormat)
        ?.name;
    },
    getAdFormatNameById(id: number): string | undefined {
      return self.adFormatList.find(item => item.id === id)?.name;
    },
  }))
  .actions(self => ({
    setAdFormat(
      adFormat: number,
      callback?: (name: string) => void,
    ): void {
      self.adFormat = adFormat;
      if (callback) {
        callback(self.getAdFormatName);
      }
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
            !permissionsForAdFormats[item.name] ||
            permissions[permissionsForAdFormats[item.name]],
        );
      } catch (error) {
        self.adFormatListStatus = LoadingStatus.ERROR;
        const message =
          error?.response?.data?.msg || 'Ad Formats loading error';

        infoNotification({
          variant: 'error',
          message,
        });
      }
    }),
  }))
  .actions(self => ({
    setEditData(data: IFullCampaignType): void {
      if (data.format_id) {
        self.setAdFormat(data.format_id);
      }
    },
  }));

export type TAdFormatModel = Instance<typeof AdFormatModel>;

export default AdFormatModel;
