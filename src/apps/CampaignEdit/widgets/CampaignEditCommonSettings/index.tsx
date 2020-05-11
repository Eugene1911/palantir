import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import TrackChangesRoundedIcon from '@material-ui/icons/TrackChangesRounded';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CampaignEditCommonLazy from './widgets/CampaignEditCommon/lazy';
import CampaignEditTargetingLazy from './widgets/CampaignEditTargeting/lazy';
import CampaignEditPanelSummary from './widgets/CampaignEditPanelSummary';
import CampaignEditPriceingLazy from './widgets/CampaignEditPriceing/lazy';
import CampaignEditSchedulingLazy from './widgets/CampaignEditScheduling/lazy';
import CampaignEditStepper from './widgets/CampaignEditStepper';

const useStyles = makeStyles(theme => ({
  main: {
    paddingLeft: 0,
    paddingRight: '56px',
    display: 'block',
  },
  footerButton: {
    padding: '17px 24px 17px 0',
    textAlign: 'right',
  },
}));

const campaignEditCommonSettingsSections = [
  {
    title: 'Common',
    firstLoad: false,
    LazyComponent: CampaignEditCommonLazy,
    Icon: SettingsIcon,
    subInfo1: 'RON',
    subInfo2: 'Native, type: Dynamic',
    subInfo3: '6 categories',
  },
  {
    title: 'Scheduling',
    firstLoad: false,
    LazyComponent: CampaignEditSchedulingLazy,
    Icon: CalendarTodayIcon,
    subInfo1: '20.04.20',
    subInfo2: '',
    subInfo3: '',
  },
  {
    title: 'Targeting',
    firstLoad: false,
    LazyComponent: CampaignEditTargetingLazy,
    Icon: TrackChangesRoundedIcon,
    subInfo1: 'All countries and territories',
    subInfo2: '',
    subInfo3: '',
  },
  {
    title: 'Pricing',
    firstLoad: false,
    LazyComponent: CampaignEditPriceingLazy,
    Icon: AttachMoneyIcon,
    subInfo1: 'CPM, Max bid 0,003 USD',
    subInfo2: 'Daily Budget: 100 USD',
    subInfo3: '',
  },
];

function CampaignEditCommonSettings(): JSX.Element {
  const classes = useStyles({});
  const [expanded, setExpanded] = React.useState('');
  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean,
  ): void => {
    setExpanded(isExpanded ? panel : '');
  };
  const [step, setStep] = useState(0);
  const onChangeSperHandler = (): void => {
    const newStep = step + 1;
    setStep(newStep);
  };

  return (
    <Paper>
      <CampaignEditStepper value={step} />

      <Divider />

      {campaignEditCommonSettingsSections.map(section => {
        const { title } = section;
        const isActive = section.title === expanded;

        if (!section.firstLoad && isActive) section.firstLoad = true;

        return (
          <ExpansionPanel
            key={title}
            expanded={isActive}
            onChange={handleChange(title)}
          >
            <CampaignEditPanelSummary
              isSelected={isActive}
              icon={<section.Icon />}
              {...section}
            />
            <ExpansionPanelDetails className={classes.main}>
              {section.firstLoad && <section.LazyComponent />}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
      <div className={classes.footerButton}>
        <Button
          endIcon={<ArrowForwardIcon />}
          size="large"
          variant="contained"
          color="primary"
          onClick={onChangeSperHandler}
        >
          Audience
        </Button>
      </div>
    </Paper>
  );
}

export default CampaignEditCommonSettings;
