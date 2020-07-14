import React from 'react';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import useCampaignEditPanelSummary from './services/useCampaignEditPanelSummary';

type TCampaignEditPanelSummaryProps = {
  isSelected: boolean;
  icon: JSX.Element;
  title?: string;
  subInfo1?: string;
  subInfo2?: string;
  subInfo3?: string;
};

function CampaignEditPanelSummary({
  isSelected,
  icon,
  title,
  subInfo1,
  subInfo2,
  subInfo3,
}: TCampaignEditPanelSummaryProps): JSX.Element {
  const {
    classes,
    gridCountInfoColumn,
  } = useCampaignEditPanelSummary({ isSelected });

  return (
    <ExpansionPanelSummary
      className={classes.main}
      expandIcon={<ExpandMoreIcon color="primary" />}
    >
      <Grid alignItems="flex-start" container>
        <Grid item xs={1} className={classes.icon}>
          {icon}
        </Grid>
        <Grid item xs={3}>
          <Typography>{title}</Typography>
        </Grid>
        <Grid className={classes.info} item xs={8} container>
          <Grid item xs={gridCountInfoColumn}>
            <Typography noWrap>{subInfo1}</Typography>
          </Grid>
          <Grid item xs={gridCountInfoColumn}>
            <Typography noWrap>{subInfo2}</Typography>
          </Grid>
          <Hidden smDown>
            <Grid item xs={4}>
              <Typography noWrap>{subInfo3}</Typography>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </ExpansionPanelSummary>
  );
}

export default CampaignEditPanelSummary;
