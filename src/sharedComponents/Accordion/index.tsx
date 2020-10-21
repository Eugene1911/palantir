import React, { FunctionComponent, SVGProps } from 'react';
import Accordion from '@material-ui/core/Accordion';
import ExpansionPanelSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import useCampaignEditPanelSummary from './services/useCampaignEditPanelSummary';

export interface ITab {
  leftSide: JSX.Element;
  rightSide: JSX.Element;
}

export interface IAccordionPanelProps {
  title: string;
  subInfo1?: string;
  subInfo2?: string;
  subInfo3?: string;
  isSelected: boolean;
  icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  children?: JSX.Element;
  tabs?: Array<ITab | JSX.Element>;
}

function AccordionPanel(props: IAccordionPanelProps): JSX.Element {
  const {
    isSelected,
    title,
    icon,
    subInfo1,
    subInfo2,
    subInfo3,
    children,
    tabs,
  } = props;
  const [isExpanded, setIsExpanded] = React.useState(isSelected);

  const {
    classes,
    gridCountInfoColumn,
  } = useCampaignEditPanelSummary({ isExpanded });

  const renderTab = (tab: ITab | JSX.Element): JSX.Element => {
    if ('leftSide' in tab) {
      return (
        <Grid
          // TODO: нормальный key
          key={String(tab.leftSide)}
          alignItems="flex-start"
          container
        >
          <Grid item xs={3} className={classes.tab}>
            {tab.leftSide}
          </Grid>
          <Grid item xs={9} className={classes.tab}>
            {tab.rightSide}
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid key={String(tab)} item xs={12} className={classes.tab} />
    );
  };

  return (
    <Accordion
      defaultExpanded={isSelected}
      expanded={isExpanded}
      onChange={(): void => setIsExpanded(!isExpanded)}
    >
      <ExpansionPanelSummary
        className={classes.main}
        expandIcon={<ExpandMoreIcon color="primary" />}
      >
        <Grid alignItems="flex-start" container>
          <Grid item xs={3} container>
            {icon && (
              <SvgIcon className={classes.icon} component={icon} />
            )}
            <Typography>{title}</Typography>
          </Grid>
          <Grid className={classes.info} item xs={9} container>
            <Grid item xs={gridCountInfoColumn}>
              <Typography noWrap>{subInfo1}</Typography>
            </Grid>
            <Grid item xs={gridCountInfoColumn}>
              <Typography noWrap>{subInfo2}</Typography>
            </Grid>
            <Hidden smDown>
              <Grid item xs={3}>
                <Typography noWrap>{subInfo3}</Typography>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <Grid className={classes.wrap} container>
        {tabs ? tabs.map(tab => renderTab(tab)) : children}
      </Grid>
    </Accordion>
  );
}
export default AccordionPanel;
