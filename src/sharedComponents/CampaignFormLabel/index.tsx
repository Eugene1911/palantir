import React from 'react';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import useStyles from './useStyles';
import QuestionTooltip from '../QuestionTooltip';

export interface ICampaignFormLabelProps {
  text: string;
  tooltipText?: string | null | undefined;
}

function CampaignFormLabel(
  props: ICampaignFormLabelProps,
): JSX.Element {
  const { text, tooltipText } = props;

  const classes = useStyles();

  return (
    <Grid alignItems="center" container>
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
