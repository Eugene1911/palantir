import React, { FunctionComponent, SVGProps } from 'react';
import Accordion from '@material-ui/core/Accordion';
import ExpansionPanelSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';

interface IAccordionPanel {
  summary: string;
  icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  children?: JSX.Element;
}

function AccordionPanel(props: IAccordionPanel): JSX.Element {
  const { summary, children, icon } = props;
  return (
    <Accordion defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {icon && <SvgIcon component={icon} />}
        <Typography>{summary}</Typography>
      </ExpansionPanelSummary>
      {children}
    </Accordion>
  );
}
export default AccordionPanel;
