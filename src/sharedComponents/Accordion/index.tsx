import React, { FunctionComponent, SVGProps } from 'react';
import Accordion from '@material-ui/core/Accordion';
import ExpansionPanelSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import useCampaignEditPanelSummary from './useCampaignEditPanelSummary';

import * as S from './AccordeonStyles';

interface IAccordionPanel {
  title: string;
  subInfo1?: string;
  subInfo2?: string;
  subInfo3?: string;
  isSelected: boolean;
  icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  children?: JSX.Element;
}

function AccordionPanel(props: IAccordionPanel): JSX.Element {
  const {
    title,
    children,
    icon,
    isSelected,
    subInfo1,
    subInfo2,
    subInfo3,
  } = props;
  const [isExpanded, setIsExpanded] = React.useState(isSelected);

  const {
    classes,
    gridCountInfoColumn,
  } = useCampaignEditPanelSummary({ isExpanded });

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
          <Grid item xs={1} className={classes.icon}>
            {icon && <SvgIcon component={icon} />}
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
      <S.ContentWrapper>{children}</S.ContentWrapper>
    </Accordion>
  );
}
export default AccordionPanel;
