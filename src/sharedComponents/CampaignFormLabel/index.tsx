import React from 'react';
import cn from 'classnames';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import QuestionTooltip from '../QuestionTooltip';

import useStyles from './useStyles';

export interface ICampaignFormLabelProps {
  text: string;
  tooltipText?: string | null | undefined;
  withInputMargin?: boolean; // пропс для выравнивания по высоте, если контент - инпуты
  withRadioMargin?: boolean; // пропс для выравнивания по высоте, если контент - радио
  withSliderMargin?: boolean; // пропс для выравнивания по высоте, если контент - слайдер
}

function CampaignFormLabel(
  props: ICampaignFormLabelProps,
): JSX.Element {
  const {
    text,
    tooltipText,
    withInputMargin,
    withRadioMargin,
    withSliderMargin,
  } = props;

  const classes = useStyles();

  return (
    <Grid
      alignItems="center"
      container
      className={cn({
        [classes.inputMargin]: withInputMargin,
        [classes.radioMargin]: withRadioMargin,
        [classes.sliderMargin]: withSliderMargin,
      })}
    >
      <Grid item>
        <Typography className={classes.root}>{text}</Typography>
      </Grid>
      {tooltipText && (
        <Grid item>
          <QuestionTooltip title={tooltipText} />
        </Grid>
      )}
    </Grid>
  );
}
export default CampaignFormLabel;
