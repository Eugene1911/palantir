import { types, flow, Instance } from 'mobx-state-tree';
import { NOTIFIER_DEFAULT_OPTIONS } from 'config/constants';
import { toolsUrlUnpack } from 'resources/api';
import { notiferActionOk } from 'sharedComponents/NotiferActionOk';
import { TCommonFetchingDataValueType } from 'sharedTypes';
import NotifierStore from 'sharedWidgets/Notifier/services/NotifierStore';

const UrlUnpackFormStore = types
  .model('UrlUnpackStore', {
    url: types.optional(types.string, ''),
    isLoading: types.optional(types.boolean, false),
    urlInfo: types.frozen(),
    toggleCollapse: types.optional(types.boolean, false),
    notifier: NotifierStore,
  })
  .views((self: any) => ({
    get urlInfoList(): Array<TCommonFetchingDataValueType> {
      const { urlInfo } = self;

      if (!urlInfo) return [];

      return Object.keys(urlInfo).map(info => ({
        name: info,
        value: urlInfo[info].toString(),
      }));
    },
  }))
  .actions((self: any) => ({
    getResources: flow(function* getResources() {
      self.isLoading = true;

      try {
        const { data } = yield toolsUrlUnpack({
          url: self.url,
        });

        self.urlInfo = data.response.event;

        self.isLoading = false;
      } catch (error) {
        self.isLoading = false;
        self.showNotifier(error, 'error');
      }
    }),
    onSubmitFormHandler(): void {
      self.toggleCollapse = false;
      self.urlInfo = {};
      self.getResources();
    },
    setToggleCollapse(state: boolean): void {
      self.toggleCollapse = state;
    },
    onChangeTextFieldHandler({
      target,
    }: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>): void {
      const { value } = target;

      self.url = value.toString();
    },
    showNotifier(message: string, variant: string): void {
      self.notifier.pushSnackbar({
        message: message.toString(),
        options: {
          ...NOTIFIER_DEFAULT_OPTIONS,
          variant,
          action: notiferActionOk,
        },
      });
    },
  }));

export type IUrlUnpackFormStore = Instance<typeof UrlUnpackFormStore>;

export default UrlUnpackFormStore;
