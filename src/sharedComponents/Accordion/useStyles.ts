import { makeStyles, Theme } from '@material-ui/core/styles';

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
    paddingLeft: 28,
    backgroundColor: 'rgba(242, 242, 242, 0.3)',
  },
  wrap: {
    paddingLeft: 28,
    paddingRight: 28,
  },
  info: {
    transition: `opacity ${theme.transitions.duration.short}ms linear`,
    opacity: (props: ICampaignEditPanelSummaryStylesProps): number =>
      props.isExpanded ? 0 : 1,
  },
  icon: {
    marginRight: 8,
    transition: `opacity ${theme.transitions.duration.shorter}ms linear`,
    opacity: (props: ICampaignEditPanelSummaryStylesProps): number =>
      props.isExpanded ? 1 : 0.5,
  },
  tab: {
    textAlign: 'left',
    padding: '30px 0',
  },
}));

export type TCampaignEditPanelSummaryClasses =
  | 'main'
  | 'tab'
  | 'wrap'
  | 'icon'
  | 'info';

export default useStyles;
