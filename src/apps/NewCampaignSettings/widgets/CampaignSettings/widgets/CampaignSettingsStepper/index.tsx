import React from 'react';
import { inject, observer } from 'mobx-react';

import CampaignStepper from 'sharedComponents/CampaignStepper';
import { TEditStore } from '../../stores/EditStore';

interface ICampaignSettingsStepperProps {
  edit?: TEditStore;
  getAdFormatName?: () => string;
  stepperText?: string;
}

const CampaignSettingsStepper = ({
  edit,
  getAdFormatName,
  stepperText,
}: ICampaignSettingsStepperProps): JSX.Element => {
  const id = `ID ${edit.campaignId}`;
  const adFormat = getAdFormatName
    ? `, ${getAdFormatName || ''}`
    : '';
  const countries = stepperText ? `, ${stepperText}` : '';
  const subLabel = edit.isEdit ? `${id}${adFormat}${countries}` : '';
  const subLabels: string[] = [subLabel];

  return <CampaignStepper activeStep={0} subLabels={subLabels} />;
};

export default inject(({ newCampaignSettings }) => ({
  edit: newCampaignSettings.edit,
  getAdFormatName:
    newCampaignSettings.settings.adFormat.getAdFormatName,
  stepperText: newCampaignSettings.targeting.countries.stepperText,
}))(observer(CampaignSettingsStepper));
