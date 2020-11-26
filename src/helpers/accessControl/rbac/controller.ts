import { checkRBACPermissions } from 'resources/api';

/* TODO use here a real client code interfaces; remove this one */
import { IAccessToCampaignTargeting } from 'helpers/accessControl/example/usage';

// Also the implementation which uses API RBAC endpoints to resolve the methods of the interface will be:
// eslint-disable-next-line @typescript-eslint/class-name-casing
class _AccessControl implements IAccessToCampaignTargeting {
  private static _permCampSetupHiddenCategories =
    'campaign.setup_hidden_categories';

  private static _permCampUseTabsFormat = 'campaign.use_tabs_format';

  private static _permCampUseSpecialFormats =
    'campaign.use_special_formats';

  private static _permCampUseRiskyFormat =
    'campaign.use_risky_format';

  private static _permCampUseVideoFormat =
    'campaign.use_video_format';

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

  private static _permTrafficTypeMembersArea =
    'campaign.use_members_area';

  private static _permSubID = 'campaign.target_subid';

  private static _permTrafficSource =
    'campaign.use_network_traffic_type';

  private static _permAdModelCPA = 'campaign.use_cpa_pricing_model';

  private static _permRtb = 'campaign.setup_rtb';

  canSetupHiddenCategories(): Promise<boolean> {
    return this._checkPerm(
      _AccessControl._permCampSetupHiddenCategories,
    );
  }

  canUseTabsFormat(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permCampUseTabsFormat);
  }

  canUseSpecialFormats(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permCampUseSpecialFormats);
  }

  canUseRiskyFormat(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permCampUseRiskyFormat);
  }

  canUseVideoFormat(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permCampUseVideoFormat);
  }

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

  canUseTrafficTypeMembersArea(): Promise<boolean> {
    return this._checkPerm(
      _AccessControl._permTrafficTypeMembersArea,
    );
  }

  canUseSubID(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permSubID);
  }

  canUseTrafficSource(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permTrafficSource);
  }

  canUseAdModelCPA(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permAdModelCPA);
  }

  canUseRtb(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permRtb);
  }

  private _checkPerm(perm: string): Promise<boolean> {
    return checkRBACPermissions([perm]).then(data => {
      return data ? data.data[perm] : false;
    });
  }
}

// AccessControl singleton
export const AccessControl = new _AccessControl();
