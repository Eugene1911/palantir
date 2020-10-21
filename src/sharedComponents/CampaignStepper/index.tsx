import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Edit from '@material-ui/icons/Edit';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import useStyles from './useStyles';
import * as S from './styles';

import { campaignSteps } from './steps';

export interface ICampaignStepperProps {
  activeStep: number; // начиная с 0
  // массив подзаголовков для трех шагов, например [null, 'example', undefined]
  subLabels?: Array<string | null | undefined>;
}

function EditIcon(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <S.IconWrapper backgroundColor={theme.palette.primary.main}>
      <Edit fontSize="small" className={classes.editIcon} />
    </S.IconWrapper>
  );
}

function CampaignStepper(props: ICampaignStepperProps): JSX.Element {
  const { activeStep, subLabels = [] } = props;

  const classes = useStyles();

  return (
    <S.StepperWrapper>
      <Stepper className={classes.root}>
        {campaignSteps.map((label, index) => (
          <Step active key={label}>
            <StepLabel
              classes={{
                label: classes.label,
                iconContainer:
                  activeStep !== index && classes.iconContainer,
              }}
              StepIconProps={{
                classes: { text: classes.icon },
                ...(activeStep === index && {
                  icon: <EditIcon />,
                }),
              }}
            >
              {label}
              {!!subLabels[index] && (
                <Typography className={classes.subLabel}>
                  {subLabels[index]}
                </Typography>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </S.StepperWrapper>
  );
}
export default CampaignStepper;
