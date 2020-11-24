/* TODO use here a real client code interfaces; remove this one */
import { IAccessToCampaignTargeting } from 'helpers/accessControl/example/usage';

// Then the dummy implementation which always returns true for any method of the interface will be:
class _AccessControl implements IAccessToCampaignTargeting {
  canUseRegionTargeting(): Promise<boolean> {
    return this._getTruePromise();
  }

  canUseDeviceModelTargeting(): Promise<boolean> {
    return this._getTruePromise();
  }

  canUseOSVersionTargeting(): Promise<boolean> {
    return this._getTruePromise();
  }

  canUseBrowserVersionTargeting(): Promise<boolean> {
    return this._getTruePromise();
  }

  canUseProxyTrafficTypeTargeting(): Promise<boolean> {
    return this._getTruePromise();
  }

  canUseKeywordsTargeting(): Promise<boolean> {
    return this._getTruePromise();
  }

  canSetupAnyPriceSpecial(): Promise<boolean> {
    return this._getTruePromise();
  }

  isAdvertiserAccountManager(): Promise<boolean> {
    return this._getTruePromise();
  }

  isPerformanceManager(): Promise<boolean> {
    return this._getTruePromise();
  }

  canUseSpecialSettings(): Promise<boolean> {
    return this._getTruePromise();
  }

  private _getTruePromise(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

// AccessControl singleton
export const AccessControl = new _AccessControl();
