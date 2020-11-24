import { flow, Instance, types } from 'mobx-state-tree';
import { INotification, LoadingStatus } from 'sharedTypes';
import AccessControl from 'helpers/accessControl/controller';

export const InitialPermissionsStore = {
  permissionsStatus: LoadingStatus.INITIAL,
  canUseRegionSetting: false,
  canUseDeviceSetting: false,
  canUseOsVersions: false,
  canUseBrowserVersions: false,
  canUseTrafficSourceType: false,
  canUseKeywords: false,
  canSetupAnyPrice: false,
  isAdvertiserAccountManager: false,
  isPerformanceManager: false,
  canUseSpecialSettings: false,
};

const PermissionsStore = types
  .model({
    permissionsStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
    canUseRegionSetting: types.boolean,
    canUseDeviceSetting: types.boolean,
    canUseOsVersions: types.boolean,
    canUseBrowserVersions: types.boolean,
    canUseTrafficSourceType: types.boolean,
    canUseKeywords: types.boolean,
    canSetupAnyPrice: types.boolean,
    isAdvertiserAccountManager: types.boolean,
    isPerformanceManager: types.boolean,
    canUseSpecialSettings: types.boolean,
  })
  .actions(self => ({
    getPermissions: flow(function* getPermissions(
      infoNotification: (arg: INotification) => void,
    ) {
      self.permissionsStatus = LoadingStatus.LOADING;
      try {
        const [
          canUseRegionSetting,
          canUseDeviceSetting,
          canUseOsVersions,
          canUseBrowserVersions,
          canUseTrafficSourceType,
          canUseKeywords,
          canSetupAnyPrice,
          isAdvertiserAccountManager,
          isPerformanceManager,
          canUseSpecialSettings,
        ] = yield Promise.all([
          AccessControl.canUseRegionTargeting(),
          AccessControl.canUseDeviceModelTargeting(),
          AccessControl.canUseOSVersionTargeting(),
          AccessControl.canUseBrowserVersionTargeting(),
          AccessControl.canUseProxyTrafficTypeTargeting(),
          AccessControl.canUseKeywordsTargeting(),
          AccessControl.canSetupAnyPriceSpecial(),
          AccessControl.isAdvertiserAccountManager(),
          AccessControl.isPerformanceManager(),
          AccessControl.canUseSpecialSettings(),
        ]);

        self.canUseRegionSetting = canUseRegionSetting;
        self.canUseDeviceSetting = canUseDeviceSetting;
        self.canUseOsVersions = canUseOsVersions;
        self.canUseBrowserVersions = canUseBrowserVersions;
        self.canUseTrafficSourceType = canUseTrafficSourceType;
        self.canUseKeywords = canUseKeywords;
        self.canSetupAnyPrice = canSetupAnyPrice;
        self.isAdvertiserAccountManager = isAdvertiserAccountManager;
        self.isPerformanceManager = isPerformanceManager;
        self.canUseSpecialSettings = canUseSpecialSettings;

        self.permissionsStatus = LoadingStatus.SUCCESS;
      } catch (error) {
        self.permissionsStatus = LoadingStatus.ERROR;

        infoNotification({
          variant: 'error',
          message: 'Permissions loading error',
        });
      }
    }),
  }));

export type TPermissionsStore = Instance<typeof PermissionsStore>;

export default PermissionsStore;
