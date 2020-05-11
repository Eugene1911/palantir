import { makeStyles, Theme } from '@material-ui/core/styles';

export const campaignEditPanelSummaryIconWidth = 70;

type TCampaignEditPanelSummaryStylesProps = {
  isSelected: boolean;
};

const useStyles = makeStyles<
  Theme,
  TCampaignEditPanelSummaryStylesProps,
  TCampaignEditPanelSummaryClasses
>((theme: Theme) => ({
  main: {
    fontSize: theme.typography.pxToRem(16),
    paddingLeft: 0,
  },
  info: {
    transition: `opacity ${theme.transitions.duration.short}ms linear`,
    opacity: (props: TCampaignEditPanelSummaryStylesProps): number =>
      props.isSelected ? 0 : 1,
  },
  icon: {
    maxWidth: campaignEditPanelSummaryIconWidth,
    textAlign: 'center',
    transition: `opacity ${theme.transitions.duration.shorter}ms linear`,
    opacity: (props: TCampaignEditPanelSummaryStylesProps): number =>
      props.isSelected ? 1 : 0.5,
  },
}));

export type TCampaignEditPanelSummaryClasses =
  | 'main'
  | 'icon'
  | 'info';

export default useStyles;
