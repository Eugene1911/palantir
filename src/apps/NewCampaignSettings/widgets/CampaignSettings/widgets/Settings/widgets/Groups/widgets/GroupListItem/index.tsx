import React, { useState } from 'react';

import match from 'autosuggest-highlight/match';
import { inject, observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import useHookInfoNotification from 'sharedComponents/useHookInfoNotification';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import useStyles from './useStyles';
import {
  TGroupsModel,
  TGroupModel,
} from '../../../../stores/models/Groups';
import { GroupAccordionDetail } from './GroupAccordionDetail';

interface IGroupListItemProps {
  groups?: TGroupsModel;
  group: TGroupModel;
  openUpdateDrawer: (group: TGroupModel) => void;
  inputText: string;
  getAdFormatNameById?: (id: number) => string | undefined;
}

const GroupListItem = ({
  inputText,
  group,
  openUpdateDrawer,
  groups,
  getAdFormatNameById,
}: IGroupListItemProps): JSX.Element => {
  const classes = useStyles();
  const infoNotification = useHookInfoNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toggleLoader = (): void =>
    setIsLoading(prevLoading => !prevLoading);

  if (inputText && !match(group.name, inputText).length) {
    return null;
  }

  const handleLoadCampaign = (): void => {
    if (!group.isEmpty && !group.list.length) {
      toggleLoader();
      groups.getCampaignListByGroup(
        infoNotification,
        group.id,
        toggleLoader,
        getAdFormatNameById,
      );
    }
  };

  const handleLoadMoreCampaigns = (): void => {
    if (group.currentPage < group.pagesCount) {
      toggleLoader();
      groups.loadMoreCampaigns(
        infoNotification,
        group,
        toggleLoader,
        getAdFormatNameById,
      );
    }
  };

  return (
    <Accordion
      classes={{ expanded: classes.accordionExpanded }}
      className={classes.accordion}
      TransitionProps={{ unmountOnExit: true }}
      square
    >
      <AccordionSummary
        className={classes.accordionSummary}
        classes={{
          expanded: classes.accordionSummaryExpanded,
          expandIcon: classes.accordionSummaryExpandIcon,
          content: classes.accordionSummaryContent,
        }}
        onClick={handleLoadCampaign}
      >
        <Grid
          wrap="nowrap"
          container
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography className={classes.name}>
              {group.name}
            </Typography>
          </Grid>
          {group.isEmpty && (
            <Typography className={classes.infoText}>
              No campaigns
            </Typography>
          )}
          {!!group.list.length && (
            <Typography className={classes.infoText}>
              {group.campaignsCount} campaigns
            </Typography>
          )}
          {isLoading ? (
            <CircularProgress size={27} />
          ) : (
            <IconButton
              onClick={(): void => openUpdateDrawer(group)}
              size="small"
            >
              <EditIcon className={classes.editIcon} />
            </IconButton>
          )}
        </Grid>
      </AccordionSummary>
      <GroupAccordionDetail
        group={group}
        fetchMore={handleLoadMoreCampaigns}
      />
    </Accordion>
  );
};

export default inject(({ newCampaignSettings }) => ({
  groups: newCampaignSettings.settings.groups,
  getAdFormatNameById:
    newCampaignSettings.settings.adFormat.getAdFormatNameById,
}))(observer(GroupListItem));
