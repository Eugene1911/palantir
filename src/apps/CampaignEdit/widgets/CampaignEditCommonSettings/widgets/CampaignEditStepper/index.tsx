import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const steps = [
  'Common settings',
  'Audience and Pricing',
  'Createives',
];

type TCampaignEditStepperProps = {
  value: number;
};

function CampaignEditStepper({
  value,
}: TCampaignEditStepperProps): JSX.Element {
  return (
    <Stepper activeStep={value}>
      {steps.map((label, index) => (
        <Step active={value >= index} key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default CampaignEditStepper;
