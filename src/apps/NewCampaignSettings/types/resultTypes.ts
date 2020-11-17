export interface ISettingsResultData {
  name: string;
}

export interface ISchedulingResultData {
  name: string;
}

export interface INewCampaignSettingsResultData
  extends ISettingsResultData,
    ISchedulingResultData {}
