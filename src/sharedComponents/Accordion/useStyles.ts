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
    height: '56px',
    minHeight: '56px !important', // по другому не переопределить
  },
  title: {
    fontWeight: 500,
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
    width: '24px',
    height: '24px',
    transition: `color ${theme.transitions.duration.shorter}ms linear`,
    color: (props: ICampaignEditPanelSummaryStylesProps): string =>
      props.isExpanded ? theme.palette.primary.main : '#9b9b9b',
  },
  tab: {
    textAlign: 'left',
    padding: '30px 0',
  },
  bottomBorder: {
    borderBottom: 'solid 1px #f2f2f2',
  },
  subTitle: {
    fontSize: '16px',
    color: 'rgba(42, 42, 52, 0.7)',
  },
}));

export type TCampaignEditPanelSummaryClasses =
  | 'main'
  | 'title'
  | 'tab'
  | 'wrap'
  | 'icon'
  | 'info'
  | 'subTitle'
  | 'bottomBorder';

export default useStyles;
