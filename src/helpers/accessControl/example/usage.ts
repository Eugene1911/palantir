/*
  The module contains example Access Control logic client code to show how to check permission in a user code.
*/

// The interface always must be defined next to client method (here `printTagretingSkills` below)
export interface IAccessToCampaignTargeting {
  canSetupHiddenCategories(): Promise<boolean>;
  canUseTabsFormat(): Promise<boolean>;
  canUseSpecialFormats(): Promise<boolean>;
  canUseRiskyFormat(): Promise<boolean>;
  canUseVideoFormat(): Promise<boolean>;
  canUseRegionTargeting(): Promise<boolean>; // relevant for the possibilty to set up regions in the country targeting on the Targeting block
  canUseDeviceModelTargeting(): Promise<boolean>; // relevant for the possibilty to set up device model, brand, release date and price on the Targeting block
  canUseOSVersionTargeting(): Promise<boolean>; // relevant for the possibilty to set up os versions in the os custom targeting on the Targeting block
  canUseBrowserVersionTargeting(): Promise<boolean>; // relevant for the possibilty to set up browser versions in the browser custom targeting on the Targeting block
  canUseProxyTrafficTypeTargeting(): Promise<boolean>; // relevant for the presence of proxy traffic type options on the Advanced Targeting block
  canUseKeywordsTargeting(): Promise<boolean>;
  canSetupAnyPriceSpecial(): Promise<boolean>;
  isAdvertiserAccountManager(): Promise<boolean>;
  isPerformanceManager(): Promise<boolean>;
  canUseSpecialSettings(): Promise<boolean>;
}

export class AccessControlDemo {
  private access: IAccessToCampaignTargeting;

  constructor(access: IAccessToCampaignTargeting) {
    this.access = access;
  }

  // Demo method which prints all campaign targeting user skills
  printTagretingSkills() {
    this.access
      .canUseRegionTargeting()
      .then(allow =>
        this._printSkillInfo('use region targeting', allow),
      );
    this.access
      .canUseBrowserVersionTargeting()
      .then(allow =>
        this._printSkillInfo('use browser version targeting', allow),
      );
    this.access
      .canUseOSVersionTargeting()
      .then(allow =>
        this._printSkillInfo('use os version targeting', allow),
      );
    this.access
      .canUseDeviceModelTargeting()
      .then(allow =>
        this._printSkillInfo('use device model targeting', allow),
      );
    this.access
      .canUseProxyTrafficTypeTargeting()
      .then(allow =>
        this._printSkillInfo('use proxy traffic type', allow),
      );
    this.access
      .canUseKeywordsTargeting()
      .then(allow => this._printSkillInfo('use keywords', allow));
  }

  // Helper method to print a skill for method `printTagretingSkills`
  private _printSkillInfo(skill: string, allow: boolean) {
    console.log(`Can I ${skill}? ${allow ? 'yes' : 'no'}`);
  }
}
