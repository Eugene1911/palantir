import { makeStyles, Theme } from '@material-ui/core/styles';

export const campaignEditPanelSummaryIconWidth = 70;

interface ICampaignEditPanelSummaryStylesProps {
  isExpanded: boolean;
}

const useStyles = makeStyles<
  Theme,
  ICampaignEditPanelSummaryStylesProps,
  TCampaignEditPanelSummaryClasses
>((theme: Theme) => ({
  main: {
    fontSize: theme.typography.pxToRem(16),
    paddingLeft: 0,
    backgroundColor: 'rgba(242, 242, 242, 0.3)',
  },
  info: {
    transition: `opacity ${theme.transitions.duration.short}ms linear`,
    opacity: (props: ICampaignEditPanelSummaryStylesProps): number =>
      props.isExpanded ? 0 : 1,
  },
  icon: {
    maxWidth: campaignEditPanelSummaryIconWidth,
    textAlign: 'center',
    transition: `opacity ${theme.transitions.duration.shorter}ms linear`,
    opacity: (props: ICampaignEditPanelSummaryStylesProps): number =>
      props.isExpanded ? 1 : 0.5,
  },
}));

export type TCampaignEditPanelSummaryClasses =
  | 'main'
  | 'icon'
  | 'info';

export default useStyles;
