import { checkRBACPermissions } from 'resources/api';

/* TODO use here a real client code interfaces; remove this one */
import { IAccessToCampaignTargeting } from 'helpers/accessControl/example/usage';

// Also the implementation which uses API RBAC endpoints to resolve the methods of the interface will be:
class _AccessControl implements IAccessToCampaignTargeting {
  private static _permCampUseRegionSetting =
    'campaign.use_region_setting';
  private static _permCampUseBrowserVersions =
    'campaign.use_browser_versions';
  private static _permCampUseOSVersions = 'campaign.use_os_versions';
  private static _permCampUseDeviceSetting =
    'campaign.use_device_setting';
  private static _permCampUseProxyTrafficType =
    'campaign.use_traffic_source_type';
  private static _permCampUseKeywords = 'campaign.use_keywords';
  private static _permCampSetupAnyPrice = 'campaign.setup_any_price';
  private static _permUseSpecialSettings =
    'campaign.use_special_fields';
  private static _permIsAdvertiserAccountManager =
    'advertiser_account_manager';
  private static _permIsPerformanceManager = 'performance_manager';

  canUseRegionTargeting(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permCampUseRegionSetting);
  }

  canUseDeviceModelTargeting(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permCampUseDeviceSetting);
  }

  canUseOSVersionTargeting(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permCampUseOSVersions);
  }

  canUseBrowserVersionTargeting(): Promise<boolean> {
    return this._checkPerm(
      _AccessControl._permCampUseBrowserVersions,
    );
  }

  canUseProxyTrafficTypeTargeting(): Promise<boolean> {
    return this._checkPerm(
      _AccessControl._permCampUseProxyTrafficType,
    );
  }

  canUseKeywordsTargeting(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permCampUseKeywords);
  }

  canSetupAnyPriceSpecial(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permCampSetupAnyPrice);
  }

  isAdvertiserAccountManager(): Promise<boolean> {
    return this._checkPerm(
      _AccessControl._permIsAdvertiserAccountManager,
    );
  }

  isPerformanceManager(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permIsPerformanceManager);
  }

  canUseSpecialSettings(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permUseSpecialSettings);
  }

  private _checkPerm(perm: string): Promise<boolean> {
    return checkRBACPermissions([perm]).then(data => {
      return data ? data.data[perm] : false;
    });
  }
}

// AccessControl singleton
export const AccessControl = new _AccessControl();
