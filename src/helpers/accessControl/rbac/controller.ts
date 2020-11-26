import { checkRBACPermissions } from 'resources/api';

/* TODO use here a real client code interfaces; remove this one */
import { IAccessToCampaignTargeting } from 'helpers/accessControl/example/usage';

// Also the implementation which uses API RBAC endpoints to resolve the methods of the interface will be:
// eslint-disable-next-line @typescript-eslint/class-name-casing
class _AccessControl implements IAccessToCampaignTargeting {
  private static _permCampUseRegionSetting =
    'campaign.use_region_settingg';

  private static _permCampUseBrowserVersions =
    'campaign.use_browser_versions';

  private static _permCampUseOSVersions = 'campaign.use_os_versions';

  private static _permCampUseDeviceSetting =
    'campaign.use_device_setting';

  private static _permCampUseNetworkTrafficType =
    'campaign.use_network_traffic_type';

  private static _permCampUseKeywords = 'campaign.use_keywords';

  private static _permUseSpecialSettings =
    'campaign.use_special_fields';

  private static _permTrafficTypeMembersArea =
    'campaign.use_members_area';

  private static _permSubID = 'campaign.target_subid';

  private static _permTrafficSource =
    'campaign.use_network_traffic_type';

  private static _permAdModelCPA = 'campaign.use_cpa_pricing_model';

  private static _permRtb = 'campaign.setup_rtb';

  canUseRegionTargeting(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permCampUseRegionSetting);
  }

  canUseBrowserVersionTargeting(): Promise<boolean> {
    return this._checkPerm(
      _AccessControl._permCampUseBrowserVersions,
    );
  }

  canUseOSVersionTargeting(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permCampUseOSVersions);
  }

  canUseDeviceModelTargeting(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permCampUseDeviceSetting);
  }

  canUseProxyTrafficType(): Promise<boolean> {
    return this._checkPerm(
      _AccessControl._permCampUseNetworkTrafficType,
    );
  }

  canUseKeywords(): Promise<boolean> {
    return this._checkPerm(_AccessControl._permCampUseKeywords);
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
