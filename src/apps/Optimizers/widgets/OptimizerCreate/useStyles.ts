import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCampaignEditPanelSummaryClasses>(
  (theme: Theme) => ({
    addGroupButton: {
      marginLeft: '-5px',
    },
    createDateLabel: {
      fontSize: '13px',
      marginRight: '4px',
      color: theme.palette.grey[500],
    },
    createDate: {
      fontSize: '13px',
    },
  }),
);

export type TCampaignEditPanelSummaryClasses =
  | 'addGroupButton'
  | 'createDateLabel'
  | 'createDate';

export default useStyles;
