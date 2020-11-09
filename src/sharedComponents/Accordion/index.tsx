import React, { ElementType } from 'react';
import uuid from 'react-uuid';
import Accordion from '@material-ui/core/Accordion';
import ExpansionPanelSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
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
  Icon?: ElementType;
  children?: JSX.Element;
  tabs?: Array<ITab | JSX.Element>;
}

function AccordionPanel(props: IAccordionPanelProps): JSX.Element {
  const {
    isSelected,
    title,
    Icon,
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
          key={uuid()}
          alignItems="flex-start"
          container
          className={classes.bottomBorder}
        >
          <Grid item xs={2} className={classes.tab}>
            {tab.leftSide}
          </Grid>
          <Grid item xs={10} className={classes.tab}>
            {tab.rightSide}
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid
        key={String(tab)}
        item
        xs={12}
        className={`${classes.tab} ${classes.bottomBorder}`}
      >
        {tab}
      </Grid>
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
          <Grid item xs={2} container>
            {Icon && <Icon className={classes.icon} />}
            <Typography className={classes.title} variant="h5">
              {title}
            </Typography>
          </Grid>
          <Grid className={classes.info} item xs={10} container>
            <Grid item xs={gridCountInfoColumn}>
              <Typography className={classes.subTitle} noWrap>
                {subInfo1}
              </Typography>
            </Grid>
            <Grid item xs={gridCountInfoColumn}>
              <Typography className={classes.subTitle} noWrap>
                {subInfo2}
              </Typography>
            </Grid>
            <Hidden smDown>
              <Grid item xs={4}>
                <Typography className={classes.subTitle} noWrap>
                  {subInfo3}
                </Typography>
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
