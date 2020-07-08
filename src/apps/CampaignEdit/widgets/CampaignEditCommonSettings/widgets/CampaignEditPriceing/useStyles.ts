import { makeStyles, Theme } from '@material-ui/core/styles';
import { campaignEditPanelSummaryIconWidth } from '../CampaignEditPanelSummary/useStyles';

const useStyles = makeStyles<Theme, TCampaignEditCommonClasses>({
  leftIndent: {
    maxWidth: campaignEditPanelSummaryIconWidth,
  },
});

type TCampaignEditCommonClasses = 'leftIndent';

export default useStyles;
